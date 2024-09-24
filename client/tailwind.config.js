/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "geist-regular": ["Geist-Regular", "Regular"],
        "geist-medium": ["Geist-Medium", "Medium"],
        "geist-semi": ["Geist-SemiBold", "SemiBold"],
        "geist-bold": ["Geist-Bold", "Bold"],
      },
      plugins: [],
    },
  },
};
