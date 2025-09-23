import { createContext, useContext, useState, useEffect } from "react";
import { ThemeProvider } from "styled-components/native";
import { lightTheme, darkTheme } from "../styles/theme";
import * as SplashScreen from "expo-splash-screen";

import {
  useFonts as useRoboto,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import {
  useFonts as useMontserrat,
  Montserrat_400Regular,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";

SplashScreen.preventAutoHideAsync();

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export function ThemeProviderContext({ children }) {
  const [theme, setTheme] = useState(lightTheme);

  const [robotoLoaded] = useRoboto({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  const [montserratLoaded] = useMontserrat({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
  });

  const fontsLoaded = robotoLoaded && montserratLoaded;

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  function toggleTheme() {
    setTheme((prev) => (prev.title === "dark" ? lightTheme : darkTheme));
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}
