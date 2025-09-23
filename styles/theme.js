import { Platform } from "react-native";

const iosShadow = (opacity, radius, height = 1) => ({
  shadowColor: "#000",
  shadowOffset: { width: 0, height },
  shadowOpacity: opacity,
  shadowRadius: radius,
});

export const darkTheme = {
  title: "dark",
  colors: {
    background: "#121212",
    surface: "#1E1E1E",
    primary: "#E63946",
    secondary: "#00B4D8",
    textPrimary: "#FFF",
    textSecondary: "#CCC",
  },
  fonts: {
    primary: "Roboto_400Regular",
    primaryBold: "Roboto_700Bold",
    secondary: "Montserrat_400Regular",
    secondarySemiBold: "Montserrat_600SemiBold",
  },
  radius: { small: 4, medium: 8, large: 16 },
  shadows: Platform.select({
    ios: {
      sm: iosShadow(0.08, 3),
      md: iosShadow(0.12, 6),
      lg: iosShadow(0.16, 10),
      xl: iosShadow(0.22, 16),
    },
    android: {
      sm: { elevation: 2 },
      md: { elevation: 4 },
      lg: { elevation: 8 },
      xl: { elevation: 12 },
    },
  }),
};

export const lightTheme = {
  title: "light",
  colors: {
    background: "#FFF",
    surface: "#F5F5F5",
    primary: "#E63946",
    secondary: "#00B4D8",
    textPrimary: "#121212",
    textSecondary: "#555",
  },
  fonts: {
    primary: "Roboto_400Regular",
    primaryBold: "Roboto_700Bold",
    secondary: "Montserrat_400Regular",
    secondarySemiBold: "Montserrat_600SemiBold",
  },
  radius: { small: 4, medium: 8, large: 16 },
  shadows: Platform.select({
    ios: {
      sm: iosShadow(0.16, 3),
      md: iosShadow(0.18, 6),
      lg: iosShadow(0.22, 10),
      xl: iosShadow(0.28, 16),
    },
    android: {
      sm: { elevation: 2 },
      md: { elevation: 4 },
      lg: { elevation: 8 },
      xl: { elevation: 12 },
    },
  }),
};
