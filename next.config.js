const { withPlugins } = require('next-compose-plugins');
const withOptimizedImages = require('next-optimized-images');
const withFonts = require('next-fonts');
const withCSS = require('@zeit/next-css');

// next.js configuration
const nextConfig = {
  env: {
    STRIPE_PUBLIC_KEY: 'your_stripe_public_key_here',
    API_URL: 'https://90ionm52bc.execute-api.us-east-1.amazonaws.com/dev/graphql',
    // API_URL: 'http://localhost:4000/',
    DOMAIN_NAME: 'http://ec2-35-154-158-99.ap-south-1.compute.amazonaws.com:3000'
  },
  webpack: config => {
    config.resolve.modules.push(__dirname);

    config.resolve.alias = {
      ...config.resolve.alias,
    };
    return config;
  },
};

module.exports = withPlugins(
  [withCSS, withOptimizedImages, withFonts],
  nextConfig
);
