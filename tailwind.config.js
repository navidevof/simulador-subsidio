/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"custom-primary": "#2C2C2C",
				"custom-secondary": "#E6E6E6",
			},
		},
	},
	plugins: [],
};
