import siteConfig from "./data/config.json";

const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@isomerpages/isomer-components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        site: {
          primary: {
            DEFAULT: siteConfig.colors["site-primary-default"],
            100: siteConfig.colors["site-primary-100"],
            200: siteConfig.colors["site-primary-200"],
          },
          secondary: {
            DEFAULT: siteConfig.colors["site-secondary-default"],
          },
        },
      },
    },
  },
};
export default config;
