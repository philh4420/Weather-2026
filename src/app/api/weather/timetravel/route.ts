import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');
  const date = searchParams.get('date'); // Unix timestamp

  if (!lat || !lon || !date) {
    return NextResponse.json({ errors: ['Missing required parameters: lat, lon, and date'] }, { status: 400 });
  }

  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&dt=${date}&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ errors: ['Failed to fetch historical weather data'] }, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ errors: [err.message] }, { status: 500 });
    }
    return NextResponse.json({ errors: ['An unexpected error occurred.'] }, { status: 500 });
  }
}
