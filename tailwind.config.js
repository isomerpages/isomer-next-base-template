const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@isomerpages/isomer-components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6031b6",
        secondary: "#4372d6",
        subtitle: "#344054",
        paragraph: "#344054",
        dark: "#6d58bb",
        prose: "#484848",
        headings: "#6d58bb",
        header: "#2164da",
        navItems: "#323232",
      },
      fontFamily: {
        sans: ["Lato", "ui-sans-serif", "system-ui"],
      },
      typography: ({ theme }) => ({
        isomer: {
          css: {
            "--tw-prose-body": theme("colors.prose"),
            "--tw-prose-headings": theme("colors.headings"),
            "--tw-prose-bullets": theme("colors.prose"),
            "--tw-prose-links": theme("colors.secondary"),
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
