import { useState } from "react";
import {
  BodyText,
  Button,
  ButtonText,
  Centered,
  ScreenContainer,
} from "../../styles/GlobalStyles";
import { useTheme } from "../../contexts/ThemeContext";

export default function SelectRole({ navigation }) {
  const { theme } = useTheme();
  return (
    <ScreenContainer>
      <Centered style={{ gap: 8 }}>
        <Button
          style={{ width: "100%", maxWidth: 200 }}
          onPress={() => {
            navigation.navigate("Register", { role: "customer" });
          }}
        >
          <ButtonText>Sou cliente</ButtonText>
        </Button>
        <Button
          style={{ width: "100%", maxWidth: 200 }}
          onPress={() => {
            navigation.navigate("Register", { role: "business" });
          }}
        >
          <ButtonText>Sou negócio</ButtonText>
        </Button>
        <BodyText
          onPress={() => navigation.navigate("Login")}
          style={{
            color: theme.colors.secondary,
            marginTop: 15,
            textAlign: "center",
          }}
        >
          Voltar para Login.
        </BodyText>
      </Centered>
    </ScreenContainer>
  );
}
