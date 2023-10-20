import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
    output: 'server',
    site: 'https://ambisonics.github.io',
    adapter: node({
        mode: 'standalone',
    }),
});