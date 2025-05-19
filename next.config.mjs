/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
            },
        ],
    },
    allowedDevOrigins: ['http://192.168.1.7:3000'],
};

export default nextConfig;
