import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
    output: 'server',
    site: 'https://ambisonicslab.com',
    adapter: node({
        mode: 'standalone',
    }),
});