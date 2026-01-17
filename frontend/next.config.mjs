/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone", // <--- ADD THIS LINE
  
  // Optional: Clean up console logs in production
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;