/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    colors: {
      'LarSud': 'B14205',
      'AzuSud': '161548'
    },
    extend: {
      borderWidth: {
        '25': '25px', 
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('@tailwindcss/container-queries'),
  ],
}

