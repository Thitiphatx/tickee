/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['atkmedia.allticket.com'], // Add the domain you want to allow
      },
    eslint:{
      ignoreDuringBuilds:true,
    }
}

module.exports = nextConfig


