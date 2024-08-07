import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js',
  ],
  theme: {
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [ {
      light: {
        ...require("daisyui/src/theming/themes")["light"],
        primary:"#3c5aa6",
        "primary-focus": "#c7a008",
      },
    },]
  },
};
export default config;
