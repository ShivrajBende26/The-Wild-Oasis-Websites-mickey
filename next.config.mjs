/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["localhost", "127.0.0.1", "192.168.29.141"],
  images: {
    qualities: [75, 80, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "npmjjjtvhqpfgqkueuyl.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "authjs.dev",
        pathname: "/img/providers/google.svg",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
      },
    ],
  },
  // output: "export",
};

export default nextConfig;
