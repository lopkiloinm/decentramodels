import type { Config } from 'tailwindcss';

export default {
	content: ['./index.html', './src/**/*.{ts,tsx}'],
	theme: {
		extend: {},
	},
	darkMode: 'media',
	corePlugins: {
		preflight: false,
	},
	plugins: [],
} satisfies Config; 