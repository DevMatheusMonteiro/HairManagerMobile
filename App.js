import { ThemeProviderContext } from "./contexts/ThemeContext";
import { theme } from "./styles/theme";
import { AuthProvider } from "./contexts/AuthContext";
import Routes from "./navigations/Routes";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { GlobalContainer } from "./styles/GlobalStyles";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProviderContext theme={theme}>
        <AuthProvider>
          <GlobalContainer>
            <Routes />
          </GlobalContainer>
        </AuthProvider>
      </ThemeProviderContext>
    </GestureHandlerRootView>
  );
}
