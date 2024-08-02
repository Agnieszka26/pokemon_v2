/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['react-daisyui'],
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
