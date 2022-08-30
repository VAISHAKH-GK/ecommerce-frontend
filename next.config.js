/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains:["5.imimg.com","p7.hiclipart.com","localhost"]
  }
}

module.exports = nextConfig
