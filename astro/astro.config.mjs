import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://yunusga.uz',
	i18n: {
		defaultLocale: "ru",
		locales: [
			"ru",

		],
		routing: {
			prefixDefaultLocale: false
		}
	},
	integrations: [
		mdx(),
		sitemap(),
	],
});
