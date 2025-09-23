import { ThemeProviderContext } from "./contexts/ThemeContext";
import { theme } from "./styles/theme";
import { AuthProvider } from "./contexts/AuthContext";
import Routes from "./navigations/Routes";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ScreenContainer } from "./styles/GlobalStyles";

export default function App() {
  return (
    <GestureHandlerRootView>
      <ThemeProviderContext theme={theme}>
        <AuthProvider>
          <ScreenContainer>
            <Routes />
          </ScreenContainer>
        </AuthProvider>
      </ThemeProviderContext>
    </GestureHandlerRootView>
  );
}
