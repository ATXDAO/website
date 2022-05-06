function throwEnv(envVar) {
  if (!process.env[envVar]) {
    throw new Error(`Missing environment variable: ${envVar}`);
  }
  return process.env[envVar];
}

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  poweredByHeader: false,
  distDir: 'build',
  env: {
    NEXT_PUBLIC_ALCHEMY_ID: throwEnv('NEXT_PUBLIC_ALCHEMY_ID'),
    NEXT_PUBLIC_ETHERSCAN_API_KEY: throwEnv('NEXT_PUBLIC_ETHERSCAN_API_KEY'),
    NEXT_PUBLIC_INFURA_ID: throwEnv('NEXT_PUBLIC_INFURA_ID'),
    NEXT_PRIVATE_EVENTBRITE_KEY: throwEnv('NEXT_PRIVATE_EVENTBRITE_KEY'),
    NEXT_PRIVATE_EVENTBRITE_ORGID: throwEnv('NEXT_PRIVATE_EVENTBRITE_ORGID'),
  },
  webpack: {
    resolve: {
      mainFields: ['browser', 'module', 'main'],
    },
  },
};

module.exports = nextConfig;
