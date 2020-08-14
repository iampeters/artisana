import { DefaultTheme } from '@react-navigation/native';

const Blue = {
  ...DefaultTheme,
  fonts: {
    Roboto: 'Roboto',
    RobotoMedium: 'RobotoMedium',
    ProductSansRegular: 'ProductSansRegular',
    ProductSansBold: 'ProductSansBold',
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
  },
  colors: {
    ...DefaultTheme.colors,
    light: 'lightgray',
    danger: '#ff3d71',
    info: '#0095ff',
    purple: '#816dff',
    success: '#00d68f',
    white: '#ffffff',
    warn: '#ffc107',
    background: '#fff',
    primary: '#0095ff',
    surface: '#fff',
    secondary: '#b79cff',
    onBackground: '',
    onSurface: '',
    onPrimary: '',
    onSecondary: '',
    dark: '#282828',
    black: '#000000',
    active: '#0095ff',
  },
};

export default Blue;
