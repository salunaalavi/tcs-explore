/** @type {import('next').NextConfig} */
const nextConfig = {
  // to collocate files used only in a single page
  // ref: https://nextjs.org/docs/pages/api-reference/next-config-js/pageExtensions#including-non-page-files-in-the-pages-directory
  pageExtensions: ["page.tsx"],
  reactStrictMode: true,
  env: {
    API_SOURCE: process.env.API_SOURCE,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.API_SOURCE}/:path*`,
      },
    ];
  },
  async redirects() {
    return [
      // {
      //   source: "/",
      //   destination: "/artikel/page/1",
      //   permanent: false,
      // },
      // {
      //   source: "/artikel",
      //   destination: "/artikel/page/1",
      //   permanent: false,
      // },
    ];
  },
};

module.exports = nextConfig
