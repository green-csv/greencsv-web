// @ts-check
import {defineConfig} from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from "@tailwindcss/vite";
import vue from '@astrojs/vue';

export default defineConfig({
    i18n: {
        locales: ["es", "en"],
        defaultLocale: "en",
    },
    site: 'https://www.greencsv.dev',
    integrations: [
        mdx(),
        sitemap(),
        vue(),
    ],
    vite: {plugins: [tailwindcss()]},
});
