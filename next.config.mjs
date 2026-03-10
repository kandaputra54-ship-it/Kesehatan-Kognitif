/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'drive.google.com', // Mengizinkan gambar dari Google Drive
      },
    ],
  },
};

export default nextConfig;