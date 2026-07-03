/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#22301F',
        paper: '#F2F3EC',
        moss: '#3D5A36',
        fern: '#5F7D50',
        sage: '#E4E8DA',
        amber: '#B97615',
        brick: '#9C3F2E'
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: [
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'sans-serif'
        ]
      }
    }
  },
  plugins: []
};
