import { ThemeProvider } from "styled-components/native";
import { theme } from "./styles/theme";
import { AuthProvider } from "./contexts/AuthContext";
import Routes from "./navigations/Routes";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}
