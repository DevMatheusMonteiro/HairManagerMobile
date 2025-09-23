import { useState } from "react";
import { ActivityIndicator } from "react-native";
import {
  ScreenContainer,
  Input,
  Button,
  ButtonText,
  Title,
  BodyText,
  SmallText,
  Centered,
} from "../../styles/GlobalStyles";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "styled-components";

export default function Login({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const theme = useTheme();

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await login({ email, password });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <Centered>
        <Title style={{ marginBottom: 10 }}>Login</Title>

        {error ? (
          <SmallText style={{ color: "#ff4d4f", marginBottom: 10 }}>
            {error}
          </SmallText>
        ) : null}

        <Input
          style={{ maxWidth: 300 }}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Input
          style={{ maxWidth: 300, marginTop: 8 }}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Button
          onPress={handleLogin}
          disabled={loading}
          style={{ marginTop: 10 }}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <ButtonText>Entrar</ButtonText>
          )}
        </Button>

        <BodyText
          onPress={() => navigation.navigate("Register")}
          style={{
            color: theme.colors.secondary,
            marginTop: 15,
            textAlign: "center",
          }}
        >
          Não tem conta? Cadastre-se
        </BodyText>
      </Centered>
    </ScreenContainer>
  );
}
