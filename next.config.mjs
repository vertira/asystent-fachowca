/** @type {import('next').NextConfig} */
import withSerwistInit from "@serwist/next";
const withSerwist = withSerwistInit({
  disable: false,
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
});
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
        pathname: "/**",
      },
    ],
  },
};
export default withSerwist(nextConfig);
