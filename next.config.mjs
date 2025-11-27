/** @type {import('next').NextConfig} */
const nextConfig = {
 
  reactCompiler: true,
  // Remove static export because we need SSR
  output: undefined,
};

export default nextConfig;
