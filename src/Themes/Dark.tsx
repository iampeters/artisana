import { DarkTheme } from '@react-navigation/native';

const Dark = {
  ...DarkTheme,
  fonts: {
    Roboto: 'Roboto',
    RobotoMedium: 'RobotoMedium',
    ProductSansRegular: 'ProductSansRegular',
    ProductSansBold: 'ProductSansBold',
    ProductSansLight: 'ProductSansLight',
    ProductSansMedium: 'ProductSansMedium',
    RubikRegular: "RubikRegular",
    RubikMedium: "RubikMedium",
    RubikLight: "RubikLight",
    RubikItalic: "RubikItalic",
    RubikBold: "RubikBold",
    LemonadaRegular: "LemonadaRegular",
    LemonadaMedium: "LemonadaMedium",
    LemonadaLight: "LemonadaLight",
    LemonadaSemiBold: "LemonadaSemiBold",
    FuturaRegular: "FuturaRegular",
    FuturaMedium: 'FuturaMedium',
    FuturaLight: "FuturaLight",
    FuturaItalic: "FuturaItalic",
    FuturaBold: "FuturaBold",
  },
  fontSizes: {
    body: 18,
    heading: 26,
    title: 35,
    cardTitle: 20,
    small: 16,
    iconSize: 22,
  },
  colors: {
    ...DarkTheme.colors,
    light: '#eff4f5',
    danger: '#ff769f',
    navy: '#093892',
    info: '#0068cb',
    gray: 'gray',
    purple: '#4841cb',
    success: '#00a361',
    white: '#ffffff',
    warn: '#e9b21c',
    text: '#fff',
    dark: '#24292e',
    black: '#000000',
    primary: '#4841cb',
    appBar: '#67164c',
    onAppBar: '#67164c',
    background: '#24292e',
    // background: '#121212',
    active: '#ffffff',
    surface: '#31363f',
    secondary: '#b79cff',
    onBackground: '#ffffff',
    onSurface: '#ffffff',
    onPrimary: '#fff',
    onSecondary: '#000',
    borderColor: '#181a1f',
    onError: '#000',
    statusBar: 'light-content',
    transparent: 'transparent',
    transparentInput: 'rgba(255,255,255, .30)',
  },
};

export default Dark;
