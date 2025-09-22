// screens/RegisterScreen.js
import { useState } from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { useAuth } from "../../contexts/AuthContext";

export default function RegisterScreen({ navigation }) {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    <Container>
      <Title>Cadastro</Title>
      {error ? <ErrorText>{error}</ErrorText> : null}
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
      <Button onPress={handleRegister} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <ButtonText>Cadastrar</ButtonText>
        )}
      </Button>
      <Link onPress={() => navigation.navigate("Login")}>
        Já tem conta? Faça login
      </Link>
    </Container>
  );
}

// --- Reutilizando os mesmos styled-components do LoginScreen ---
const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.background};
`;

const Title = styled.Text`
  font-size: ${(props) => props.theme.fontSize.large}px;
  text-align: center;
  margin-bottom: 20px;
`;

const Input = styled.TextInput`
  border-width: 1px;
  border-color: #ccc;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const Button = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.primary};
  padding: 12px;
  border-radius: 5px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
`;

const Link = styled.Text`
  color: blue;
  text-align: center;
  margin-top: 15px;
`;

const ErrorText = styled.Text`
  color: red;
  text-align: center;
  margin-bottom: 10px;
`;
