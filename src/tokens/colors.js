// 50 shades of grey generator
// https://javisperez.github.io/tailwindcolorshades/#/?%233E4047=3E4047&tv=1
const colors = {
  grey100: '#ECECED',
  grey200: '#CFCFD1',
  grey300: '#B2B3B5',
  grey400: '#78797E',
  grey500: '#3E4047',
  grey600: '#383A40',
  grey700: '#25262B',
  grey800: '#1C1D20',
  grey900: '#131315',

  white: '#ffffff',
  yellow: '#ffdc4e',
  lightYellow: '#f9e892',
  blueGreyed: '#546c77',
  darkBlue: '#022a4b',
  beige: '#fff9d9',
  red: '#ff0000',
}

export const COLORS = {
  grey100: {
    light: colors.grey100,
    dark: colors.grey100,
  },
  grey200: {
    light: colors.grey200,
    dark: colors.grey200,
  },
  grey300: {
    light: colors.grey300,
    dark: colors.grey300,
  },
  grey400: {
    light: colors.grey400,
    dark: colors.grey400,
  },
  grey500: {
    light: colors.grey500,
    dark: colors.grey500,
  },
  grey600: {
    light: colors.grey600,
    dark: colors.grey600,
  },
  grey700: {
    light: colors.grey700,
    dark: colors.grey700,
  },
  grey800: {
    light: colors.grey800,
    dark: colors.grey800,
  },
  grey900: {
    light: colors.grey900,
    dark: colors.grey900,
  },
  white: {
    light: colors.white,
    dark: colors.white,
  },
  yellow: {
    light: colors.yellow,
    dark: colors.yellow,
  },
  lightYellow: {
    light: colors.lightYellow,
    dark: colors.lightYellow,
  },
  blueGreyed: {
    light: colors.blueGreyed,
    dark: colors.blueGreyed,
  },
  darkBlue: {
    light: colors.darkBlue,
    dark: colors.darkBlue,
  },
  beige: {
    light: colors.beige,
    dark: colors.beige,
  },
  red: {
    light: colors.red,
    dark: colors.red,
  },
  text: {
    light: colors.grey500,
    dark: colors.white,
  },
  textSecondary: {
    light: colors.blueGreyed,
    dark: '#c6d8e0',
  },
  siteBackground: {
    light: '#f4f8fb',
    dark: colors.grey500,
  },
  wrapperBackground: {
    light: colors.white,
    dark: colors.grey500,
  },
  secondaryContentBackground: {
    light: '#f7f7f7',
    dark: '#3a3a3a',
  },
  wrapperShadow: {
    light: '#0000001a',
    dark: '#00000000',
  },
  primary: {
    light: colors.grey500,
    dark: colors.grey500,
  },
  primaryAlpha: {
    light: 'rgba(32, 35, 42, 0.85)',
    dark: 'rgba(32, 35, 42, 0.85)',
  },
  secondary: {
    light: colors.yellow,
    dark: colors.yellow,
  },
  h2: {
    light: colors.grey500,
    dark: colors.yellow,
  },
}

export const COLOR_MODE_KEY = 'color-mode'
export const INITIAL_COLOR_MODE_CSS_PROP = '--initial-color-mode'
