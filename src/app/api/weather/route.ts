import { NextRequest, NextResponse } from 'next/server';

const processDailyForecast = (openWeatherData: any, weatherApiData: any) => {
    const dailyData: { [key: string]: any } = {};

    openWeatherData.list.forEach((item: any) => {
        const date = item.dt_txt.split(' ')[0];
        if (!dailyData[date]) {
            dailyData[date] = {
                dt: item.dt,
                temp_min: [],
                temp_max: [],
                humidity: [],
                pop: [],
                weather: item.weather,
            };
        }
        dailyData[date].temp_min.push(item.main.temp_min);
        dailyData[date].temp_max.push(item.main.temp_max);
        dailyData[date].humidity.push(item.main.humidity);
        dailyData[date].pop.push(item.pop);
    });

    const forecastDays = weatherApiData.forecast?.forecastday || [];

    return Object.values(dailyData).map((day: any, index: number) => ({
        dt: day.dt,
        temp: {
            min: Math.min(...day.temp_min),
            max: Math.max(...day.temp_max),
        },
        humidity: day.humidity.reduce((a: any, b: any) => a + b, 0) / day.humidity.length,
        pop: Math.max(...day.pop) * 100,
        weather: day.weather,
        astro: forecastDays[index]?.astro,
    }));
};

const mergeWeatherData = (weatherApiData: any, openWeatherData: any, airPollutionData: any) => {
    const daily = processDailyForecast(openWeatherData, weatherApiData);

    return {
        locationName: weatherApiData.location.name,
        current: {
            temp: weatherApiData.current.temp_c,
            feels_like: weatherApiData.current.feelslike_c,
            humidity: weatherApiData.current.humidity,
            wind_speed: weatherApiData.current.wind_kph,
            wind_dir: weatherApiData.current.wind_dir,
            wind_degree: weatherApiData.current.wind_degree,
            gust_kph: weatherApiData.current.gust_kph,
            vis_km: weatherApiData.current.vis_km,
            weather: [{
                main: weatherApiData.current.condition.text,
                icon: `https:${weatherApiData.current.condition.icon}`,
                code: weatherApiData.current.condition.code
            }],
            // Correctly handle potentially missing UV data at the source.
            uv: weatherApiData.current?.uv ?? null,
            pressure_mb: weatherApiData.current.pressure_mb,
            sunrise: openWeatherData.city.sunrise,
            sunset: openWeatherData.city.sunset,
        },
        hourly: weatherApiData.forecast.forecastday[0].hour.map((hour: any, index: number) => {
            const openWeatherHour = openWeatherData.list[index];
            const chanceOfRain = (hour.chance_of_rain + (openWeatherHour.pop * 100)) / 2;
            return {
                dt: hour.time_epoch,
                temp: hour.temp_c,
                feels_like: hour.feelslike_c,
                weather: [{
                    main: hour.condition.text,
                    icon: `https:${hour.condition.icon}`
                }],
                chance_of_rain: chanceOfRain,
            };
        }),
        alerts: weatherApiData.alerts?.alert,
        daily: daily,
        airPollution: {
            aqi: airPollutionData.list[0].main.aqi,
            us_epa_index: weatherApiData.current.air_quality['us-epa-index'],
            components: airPollutionData.list[0].components,
        },
    };
};

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const location = searchParams.get('location');
    const weatherApiKey = process.env.WEATHERAPI_API_KEY;
    const openWeatherMapApiKey = process.env.OPENWEATHERMAP_API_KEY;

    if (!weatherApiKey || !openWeatherMapApiKey || !location) {
        return NextResponse.json({ errors: ['Configuration error: Missing API key or location.'] }, { status: 500 });
    }

    try {
        const errors: string[] = [];
        const openWeatherLocation = location.includes(',') ? `lat=${location.split(',')[0]}&lon=${location.split(',')[1]}` : `q=${location}`;
        const weatherApiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${location}&days=5&aqi=yes&alerts=yes`;
        const openWeatherForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?${openWeatherLocation}&appid=${openWeatherMapApiKey}&units=metric`;

        const [weatherApiRes, openWeatherForecastRes] = await Promise.all([
            fetch(weatherApiUrl),
            fetch(openWeatherForecastUrl),
        ]);

        let weatherApiData = await weatherApiRes.json();
        const openWeatherData = await openWeatherForecastRes.json();

        const openWeatherFailed = openWeatherData.cod && openWeatherData.cod !== '200';
        let weatherApiFailed = !!weatherApiData.error;

        if (openWeatherFailed) {
            errors.push(`OpenWeatherMap Error: ${openWeatherData.message || 'Failed to retrieve data.'}`);
        }

        if (weatherApiFailed) {
            if (!openWeatherFailed) {
                const lat = openWeatherData.city.coord.lat;
                const lon = openWeatherData.city.coord.lon;
                const locationByCoords = `${lat},${lon}`;
                
                const weatherApiUrlByCoords = `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${locationByCoords}&days=5&aqi=yes&alerts=yes`;
                const weatherApiRetryRes = await fetch(weatherApiUrlByCoords);
                const weatherApiRetryData = await weatherApiRetryRes.json();

                if (weatherApiRetryData.error) {
                    errors.push(`WeatherAPI Error: ${weatherApiData.error.message}`);
                } else {
                    weatherApiData = weatherApiRetryData;
                    weatherApiFailed = false;
                }
            } else {
                 errors.push(`WeatherAPI Error: ${weatherApiData.error.message}`);
            }
        }
        
        if (errors.length > 0 || weatherApiFailed) {
             if (weatherApiFailed && !errors.some(e => e.startsWith('WeatherAPI'))) {
                errors.push(`WeatherAPI Error: ${weatherApiData.error.message}`);
             }
            return NextResponse.json({ errors }, { status: 400 });
        }

        const lat = weatherApiData.location.lat;
        const lon = weatherApiData.location.lon;
        const airPollutionUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${openWeatherMapApiKey}`;
        const airPollutionRes = await fetch(airPollutionUrl);
        const airPollutionData = await airPollutionRes.json();
        
        if (airPollutionData.cod) {
             errors.push(`Air Pollution API Error: ${airPollutionData.message || 'Failed to retrieve data.'}`);
             return NextResponse.json({ errors }, { status: 400 });
        }

        const mergedData = mergeWeatherData(weatherApiData, openWeatherData, airPollutionData);
        return NextResponse.json(mergedData);

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ errors: [`An internal error occurred: ${error.message}`] }, { status: 500 });
        }
        return NextResponse.json({ errors: ['An unknown internal error occurred'] }, { status: 500 });
    }
}
