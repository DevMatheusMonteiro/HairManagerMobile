import { useEffect, useState } from "react";
import { Alert, FlatList, Pressable } from "react-native";
import {
  ScreenContainer,
  Card,
  Title,
  BodyText,
  ScrollContainer,
  ButtonText,
  Button,
} from "../../styles/GlobalStyles";
import { findBusinessById } from "../../services/businessService";
import { DateTime } from "../../components/Datetime";
import { useAuth } from "../../contexts/AuthContext";
import { createAppointment } from "../../services/appointmentService";
import { sendEmail } from "../../services/authService";
import { useTheme } from "../../contexts/ThemeContext";

export default function BusinessDetail({ route, navigation }) {
  const { businessId } = route.params;
  const { profile } = useAuth();
  const { theme } = useTheme();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedService, setSelectedService] = useState(null);
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  async function fetchBusiness() {
    try {
      const res = await findBusinessById(businessId);
      setBusiness(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBusiness();
  }, [businessId]);

  if (loading)
    return (
      <ScreenContainer>
        <BodyText>Carregando...</BodyText>
      </ScreenContainer>
    );

  if (!business)
    return (
      <ScreenContainer>
        <BodyText>Negócio não encontrado.</BodyText>
      </ScreenContainer>
    );

  return (
    <ScreenContainer>
      <BodyText
        style={{ padding: 20, fontFamily: theme.fonts.secondarySemiBold }}
        onPress={() => navigation.goBack()}
      >
        voltar
      </BodyText>
      <ScrollContainer>
        <Title style={{ marginHorizontal: 16, marginBottom: 8 }}>
          Serviços
        </Title>
        <FlatList
          data={business.services}
          keyExtractor={(item) => String(item.id)}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          renderItem={({ item }) => (
            <Card
              shadow="md"
              style={{
                marginRight: 12,
                width: 200,
                height: 100,
                borderWidth: selectedService?.id === item.id ? 2 : 0,
                borderColor:
                  selectedService?.id === item.id
                    ? theme.colors.secondary
                    : "transparent",
              }}
            >
              <Pressable onPress={() => setSelectedService(item)}>
                <Title style={{ fontSize: 16 }}>{item.name}</Title>
                <BodyText style={{ fontSize: 14, color: "#666" }}>
                  R$ {item.price.toFixed(2).replace(".", ",")}
                </BodyText>
              </Pressable>
            </Card>
          )}
        />

        <Title style={{ marginHorizontal: 16, marginTop: 20, marginBottom: 8 }}>
          Profissionais
        </Title>
        <FlatList
          data={business.professionals}
          keyExtractor={(item) => String(item.id)}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          renderItem={({ item }) => (
            <Card
              shadow="md"
              style={{
                marginRight: 12,
                width: 200,
                height: 100,
                borderWidth: selectedProfessional?.id === item.id ? 2 : 0,
                borderColor:
                  selectedProfessional?.id === item.id
                    ? theme.colors.secondary
                    : "transparent",
              }}
            >
              <Pressable onPress={() => setSelectedProfessional(item)}>
                <Title style={{ fontSize: 16 }}>{item.name}</Title>
                <BodyText style={{ fontSize: 14, color: "#666" }}>
                  {item.specialty}
                </BodyText>
              </Pressable>
            </Card>
          )}
        />
      </ScrollContainer>
      <DateTime
        label="Escolha data e hora"
        date={selectedDateTime}
        onConfirm={(date) => setSelectedDateTime(date)}
      />
      <Button
        shadow="md"
        style={{
          marginTop: 24,
          textAlign: "center",
          width: "100%",
          maxWidth: 200,
          alignSelf: "center",
        }}
        onPress={async () => {
          if (!selectedService || !selectedProfessional || !selectedDateTime) {
            Alert.alert("Erro", "Selecione serviço, profissional e data/hora");
            return;
          }

          const payload = {
            customer_id: profile.id,
            business_id: business.id,
            service_id: selectedService.id,
            professional_id: selectedProfessional.id,
            date: selectedDateTime.toISOString(),
          };

          const data = await createAppointment(payload);
          await sendEmail({
            subject: "Serviço Solicitado",
            html: `
            <h1>${selectedService.name}</h1>
            <p>Profissional: ${selectedProfessional.name}</p>
            <p>Data/Hora: ${selectedDateTime.toISOString()}</p>
            `,
          });

          Alert.alert("Sucesso", "Serviço agendado!");
        }}
      >
        <ButtonText>Agendar</ButtonText>
      </Button>
    </ScreenContainer>
  );
}
