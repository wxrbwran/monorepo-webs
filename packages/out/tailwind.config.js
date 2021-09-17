const config = require('xzl-web-shared/src/utils/tailwind.config');

module.exports = config;
// /* eslint-disable global-require */
// const colors = require('./colors');

// // console.log('tailwind', process.env.NODE_ENV);
// const spacing = {};
// const liteSpacing = {};
// for (let i = 0; i <= 500; i++) {
//   spacing[i] = `${i}px`;
//   if (i <= 100) {
//     liteSpacing[i] = `${i}px`;
//   }
// }

// const split12 = {
//   '1/2': '50%',
//   '1/3': '33.333333%',
//   '2/3': '66.666667%',
//   '1/4': '25%',
//   '3/4': '75%',
//   '1/5': '20%',
//   '2/5': '40%',
//   '3/5': '60%',
//   '4/5': '80%',
//   '1/6': '16.666667%',
//   '5/6': '83.333333%',
//   '1/12': '8.333333%',
//   '5/12': '41.666667%',
//   '7/12': '58.333333%',
//   '11/12': '91.666667%',
// };

// module.exports = {
//   purge: process.env.NODE_ENV === 'production' ? ['./src/**/*.{vue,js,ts,jsx,tsx,html}'] : [],
//   darkMode: false, // or 'media' or 'class'
//   theme: {
//     screen: {},
//     colors: {
//       transparent: 'transparent',
//       current: 'currentColor',
//       black: colors.black,
//       white: colors.white,
//       gray: colors.gray,
//       blue: colors.blue,
//     },
//     borderColor: (theme) => ({
//       ...theme('colors'),
//       DEFAULT: theme('colors.gray.200', 'currentColor'),
//     }),
//     spacing: {
//       ...liteSpacing,
//       ...split12,
//       full: '100%',
//       auto: 'auto',
//     },
//     fontSize: {
//       xs: ['12px', { lineHeight: '16px' }],
//       sm: ['14px', { lineHeight: '20px' }],
//       base: ['16px', { lineHeight: '24px' }],
//       lg: ['18px', { lineHeight: '28px' }],
//       xl: ['20px', { lineHeight: '28px' }],
//       '2xl': ['24px', { lineHeight: '32px' }],
//       '3xl': ['30px', { lineHeight: '36px' }],
//       '4xl': ['36px', { lineHeight: '40px' }],
//       '5xl': ['48rem', { lineHeight: '52px' }],
//       '6xl': ['3.75rem', { lineHeight: '1' }],
//       '7xl': ['4.5rem', { lineHeight: '1' }],
//       '8xl': ['6rem', { lineHeight: '1' }],
//       '9xl': ['8rem', { lineHeight: '1' }],
//     },
//     height: () => ({
//       auto: 'auto',
//       ...spacing,
//       ...split12,
//       full: '100%',
//       screen: '100vh',
//     }),
//     width: () => ({
//       auto: 'auto',
//       ...spacing,
//       ...split12,
//       full: '100%',
//       screen: '100vw',
//       min: 'min-content',
//       max: 'max-content',
//     }),
//     extend: {},
//   },
//   variants: {},
//   plugins: [],
//   corePlugins: {
//     divideColor: false,
//     divideStyle: false,
//     divideWidth: false,
//     divideOpacity: false,
//     transform: false,
//   },
// };
