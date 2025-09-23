import styled from "styled-components/native";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const Container = styled.View`
  width: 100%;
  padding: 12px 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`;

const Button = styled.TouchableOpacity`
  padding: 8px;
  margin-left: 12px;
  flex-direction: row;
  align-items: center;
`;

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <Container>
      <Button onPress={toggleTheme}>
        <Ionicons
          name={theme.title === "dark" ? "sunny" : "moon"}
          size={24}
          color={theme.colors.textPrimary}
        />
      </Button>

      {user && (
        <Button onPress={logout}>
          <MaterialIcons name="logout" size={24} color={theme.colors.primary} />
        </Button>
      )}
    </Container>
  );
}
