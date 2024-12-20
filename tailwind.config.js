module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all React component files
  ],
  theme: {
    extend: {
      boxShadow: {
        customShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
      },
      colors: {
        customBlue: "#4C8CDA",
        'primary-bg': '#FAFCFE' // Custom dark blue color
      },
   
    }, // Customize your theme here if needed
  },
  plugins: [], // Add Tailwind plugins if needed
};
