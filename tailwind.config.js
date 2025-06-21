/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',       // /** */ means all files in app folder
    './pages/**/*.{js,ts,jsx,tsx}',     // /** */ means all files in app folder
    './components/**/*.{js,ts,jsx,tsx}',// /** */ means all files in app folder
    './src/**/*.{js,ts,jsx,tsx}',       // /** */ means all files in app folder
  ],
  theme: {
    extend: {
      boxShadow:{
        'even' : '0 0 7px rgba(0, 0, 0, 0.15)'
      },

      colors: {
        customMainBackground : '#245560',
        customBackgroundButton : '#245560',
        customBackgroundServices:'#1c1924',
        customBackgroundNavBar : '#322152',
        customGreen :'#17343b', 
        

        customHoverNavigation : '#1565d8',
        customTextNavigation : '#A0B5B9',
        customRocket: '#d5153c',
        customBackgroundProject :'#232323',
        customLanguage : '#d896ff',
        customBallPurple : '#d20ef9',
        customBallBlue : '#5100ec',
        customBallCream : '#ffaf7c',
      },
    },
  },
  plugins: [],
}

// information
// 1. boxShadow even and '0 0 10px means 0 0 means no offset shadow in vertical or horizontal
// 2. boxshadow even and rgba (0,0,0, 0.20) 0,0,0 means color black and 0,20 means 20% opacity of that color

