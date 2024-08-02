import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  presets: ['next/babel'],
  plugins: ['@babel/plugin-transform-private-methods'],
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
