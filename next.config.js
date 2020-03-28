const { withPlugins } = require("next-compose-plugins");
const withOptimizedImages = require("next-optimized-images");
const withFonts = require("next-fonts");
const withCSS = require("@zeit/next-css");

const devConfig = {
  STRIPE_PUBLIC_KEY: "your_stripe_public_key_here",
  API_URL: "http://localhost:4000/",
  DOMAIN_NAME: "urbannuskha.in",
  PHONE_NUMBER: "919902276965"
};

const prodConfig = {
  STRIPE_PUBLIC_KEY: "your_stripe_public_key_here",
  API_URL: "https://90ionm52bc.execute-api.us-east-1.amazonaws.com/dev/graphql",
  DOMAIN_NAME: "urbannuskha.in",
  PHONE_NUMBER: "919902276965"
};

// next.js configuration
const nextConfig = {
  env: process.env.NODE_ENV === "production" ? prodConfig : devConfig,
  webpack: config => {
    config.resolve.modules.push(__dirname);

    config.resolve.alias = {
      ...config.resolve.alias
    };
    return config;
  }
};

module.exports = withPlugins([withCSS, withOptimizedImages, withFonts], nextConfig);
