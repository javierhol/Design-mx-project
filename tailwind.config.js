/** @type {import('tailwindcss').Config} */
export default {
  content: [
    
      "./src/**/*.{js,jsx,ts,tsx}",
    
  ],
  theme: {
    extend: {
      backgroundImage: {
        'fondo-user': "url('/assets/fondouser.jpg')",
        'fondo-header': "url('/assets/fondo.jpg')",
      },
    },
  },
  plugins: [
   // require('@tailwindcss/animation'),
  ],
}


