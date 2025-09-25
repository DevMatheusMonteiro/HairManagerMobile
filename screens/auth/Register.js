import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  ScreenContainer,
  Input,
  Button,
  ButtonText,
  Title,
  BodyText,
  SmallText,
  Centered,
  ScrollContainer,
} from "../../styles/GlobalStyles";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "styled-components";

export default function Register({ navigation, route }) {
  const { register } = useAuth();
  const { role } = route.params;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const theme = useTheme();
  const handleRegister = async () => {
    setLoading(true);
    setError("");
    if (password !== confirmPassword) {
      setLoading(false);
      setError("Senhas não correspondem");
      return;
    }
    try {
      await register({
        email,
        password,
        name,
        telephone,
        role,
        extra: { cpf: cpfCnpj, cnpj: cpfCnpj, description },
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          alignItems: "center",
          flexGrow: 1,
          gap: 10,
          paddingVertical: 80,
        }}
        enableOnAndroid={true}
      >
        <Title>Cadastro de {role == "customer" ? "Cliente" : "Negócio"}</Title>
        {error ? (
          <SmallText style={{ color: "#ff4d4f", marginBottom: 10 }}>
            {error}
          </SmallText>
        ) : null}
        <Input
          placeholder="Nome"
          value={name}
          onChangeText={setName}
          style={{ maxWidth: 300 }}
        />
        <Input
          style={{ maxWidth: 300 }}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Input
          style={{ maxWidth: 300 }}
          placeholder={role === "customer" ? "CPF" : "CNPJ"}
          value={cpfCnpj}
          onChangeText={setCpfCnpj}
        />

        <Input
          style={{ maxWidth: 300 }}
          placeholder="Telefone"
          value={telephone}
          onChangeText={setTelephone}
        />
        {role === "business" && (
          <Input
            style={{ maxWidth: 300 }}
            placeholder="Descrição"
            value={description}
            onChangeText={setDescription}
          />
        )}

        <Input
          style={{ maxWidth: 300 }}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Input
          style={{ maxWidth: 300 }}
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
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
            marginTop: 5,
            textAlign: "center",
          }}
        >
          Já tem conta? Faça login
        </BodyText>
      </KeyboardAwareScrollView>
    </ScreenContainer>
  );
}
