/** @type {import('next').NextConfig} */

const nextConfig = {
  // env: {
  //   API_URL: "https://multikart-graphql-reactpixelstrap.vercel.app/server.js",
  // },

  env: {
    API_URL: "http://localhost:4000/graphql",
    // API_URL: "https://dreamstitch-api.onrender.com/graphql",
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: "121838754048-vcm0h37e2kre1uaq4ac1mgmtapvm54rr.apps.googleusercontent.com",
  },
  reactStrictMode: true,
};
module.exports = nextConfig;