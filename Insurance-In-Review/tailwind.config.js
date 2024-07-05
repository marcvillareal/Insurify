/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        "grid-pattern": "url('/Grid Background')",
      },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      purple: "#3f3cbb",
      midnight: "#121063",
      metal: "#565584",
      tahiti: "#3ab7bf",
      silver: "#ecebff",
      bubblegum: "#ff77e9",
      bermuda: "#78dcca",
      red:"#FF0000",
      // Insurify colour scheme below
      "insurify-purple": "#5E17EB",
      "insurify-grey": "#2B4148",
      "insurify-dark": "#1D1F22",
      "insurify-button-active": "#DBDBDB",
      "insurify-login-background": "#EDEDED",
      "insurify-grey-2": "#848484",
      "insurify-input": "#3A3A3A",
      "insurify-footer-banner": "#B99AF7",
      "insurify-green": "#57B97D",
      // Insurify summary pages colours 
      "insurify-1": "#0C0C0C",
      "insurify-2": "#1B1721",
      "insurify-3": "#1B0E34",
      "insurify-summary-text": "#7B7B7B"

    },
    // Custom font below
    fontFamily: {
      body: ["Montserrat", "sans-serif"],
      footer: ["Jomhuria", "san-serif"],
      "insurify-roboto": ["roboto"],
      "insurify-patua": ["patua"],
      "insurify-inter": ["inter"],
    },
    container: {
      center: true,
      padding: "1.25rem",
    },
    screens: {
      xs: "390px",
      sm: "528px",
      md: "768px",
      mdlg:"627px",
      lg: "1024px",
      mobile: "300px",
      tablet: "1064px",
      laptop: "1210px",
      desktop: "1280px",
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui"), require("@tailwindcss/forms"), require('tailwindcss-animated')],
  daisyui: {
    themes: [
      "light",
      {
        black: {
          ...require("daisyui/src/theming/themes")["black"],
          primary: "black",
          secondary: "#5E17EB",
          "--rounded-box": "1rem", // border radius rounded-box utility class, used in card and other large boxes
          "--rounded-btn": "0.5rem", // border radius rounded-btn utility class, used in buttons and similar element
          "--rounded-badge": "1.9rem", // border radius rounded-badge utility class, used in badges and similar
          "--animation-btn": "0.25s", // duration of animation when you click on button
          "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
          "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
          "--border-btn": "1px", // border width of buttons
          "--tab-border": "1px", // border width of tabs
          "--tab-radius": "0.5rem", // border radius of tabs
        },
      },
    ],
  },
};
