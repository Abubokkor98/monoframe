import { composePlugins, withNx } from '@nx/next';
import { createMDX } from 'fumadocs-mdx/next';

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  // Use this to set Nx-specific options
  nx: {},
};

const withMDX = createMDX();
const plugins = [withNx];

export default withMDX(composePlugins(...plugins)(nextConfig));
