// @ts-nocheck
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var colors = require('./colors');
// console.log('tailwind', process.env.NODE_ENV);
var spacing = {};
var liteSpacing = {};
for (var i = 0; i <= 300; i++) {
    spacing[i] = i + "px";
    if (i <= 100) {
        liteSpacing[i] = i + "px";
    }
}
var split12 = {
    '1/2': '50%',
    '1/3': '33.333333%',
    '2/3': '66.666667%',
    '1/4': '25%',
    '3/4': '75%',
    '1/5': '20%',
    '2/5': '40%',
    '3/5': '60%',
    '4/5': '80%',
    '1/6': '16.666667%',
    '5/6': '83.333333%',
    '1/12': '8.333333%',
    '5/12': '41.666667%',
    '7/12': '58.333333%',
    '11/12': '91.666667%',
};
var config = {
    darkMode: false,
    theme: {
        screen: {},
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            black: colors.black,
            white: colors.white,
            gray: colors.gray,
            blue: colors.blue,
        },
        borderColor: function (theme) { return (__assign(__assign({}, theme('colors')), { DEFAULT: theme('colors.gray.200', 'currentColor') })); },
        spacing: __assign(__assign(__assign({}, liteSpacing), split12), { full: '100%', auto: 'auto' }),
        fontSize: {
            xs: ['12px', { lineHeight: '16px' }],
            sm: ['14px', { lineHeight: '20px' }],
            base: ['16px', { lineHeight: '24px' }],
            lg: ['18px', { lineHeight: '28px' }],
            xl: ['20px', { lineHeight: '28px' }],
            '2xl': ['24px', { lineHeight: '32px' }],
            '3xl': ['30px', { lineHeight: '36px' }],
            '4xl': ['36px', { lineHeight: '40px' }],
            '5xl': ['48rem', { lineHeight: '52px' }],
            '6xl': ['3.75rem', { lineHeight: '1' }],
            '7xl': ['4.5rem', { lineHeight: '1' }],
            '8xl': ['6rem', { lineHeight: '1' }],
            '9xl': ['8rem', { lineHeight: '1' }],
        },
        height: function () { return (__assign(__assign(__assign({ auto: 'auto' }, spacing), split12), { full: '100%', screen: '100vh' })); },
        width: function () { return (__assign(__assign(__assign({ auto: 'auto' }, spacing), split12), { full: '100%', screen: '100vw', min: 'min-content', max: 'max-content' })); },
        extend: {},
    },
    variants: {},
    plugins: [],
};
if (process.env.NODE_ENV === 'production') {
    config.purge = ['./src/**/*.{vue,js,ts,jsx,tsx,html}'];
    config.mode = 'jit';
}
module.exports = config;
