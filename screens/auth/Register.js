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

export default function Register({ navigation }) {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const theme = useTheme();
  const handleRegister = async () => {
    setLoading(true);
    setError("");
    try {
      await register({ email, password, name, telephone });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <Centered>
        <Title style={{ marginBottom: 10 }}>Cadastro</Title>

        {error ? (
          <SmallText style={{ color: "#ff4d4f", marginBottom: 10 }}>
            {error}
          </SmallText>
        ) : null}

        <Input placeholder="Nome" value={name} onChangeText={setName} />
        <Input
          placeholder="Telefone"
          value={telephone}
          onChangeText={setTelephone}
        />
        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Input
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Button
          onPress={handleRegister}
          disabled={loading}
          style={{ marginTop: 10 }}
        >
          {loading ? (
            <ActivityIndicator color="blue" />
          ) : (
            <ButtonText>Cadastrar</ButtonText>
          )}
        </Button>

        <BodyText
          onPress={() => navigation.navigate("Login")}
          style={{
            color: theme.colors.secondary,
            marginTop: 15,
            textAlign: "center",
          }}
        >
          Já tem conta? Faça login
        </BodyText>
      </Centered>
    </ScreenContainer>
  );
}
