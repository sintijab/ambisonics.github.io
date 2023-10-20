import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// import node from '@astrojs/node';

export default defineConfig({
    site: 'https://ambisonicslab.com',
    integrations: [sitemap()]
});
// export default defineConfig({
//     output: 'server',
//     site: 'https://ambisonicslab.com',
//     adapter: node({
//         mode: 'standalone',
//     }),
// });