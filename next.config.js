/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/weather',
        destination: '/api/weather',
      },
    ];
  },
};

module.exports = nextConfig;
