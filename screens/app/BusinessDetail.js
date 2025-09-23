import { useEffect, useState } from "react";
import { FlatList, Pressable } from "react-native";
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
// import { Gesture, GestureDetector } from "react-native-gesture-handler";
// import { scheduleOnRN } from "react-native-worklets";

export default function BusinessDetail({ route, navigation }) {
  const { businessId } = route.params;
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedService, setSelectedService] = useState(null);
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  // const swipeBackGesture = Gesture.Pan()
  //   .onEnd((e) => {
  //     if (e.translationX > 50) {
  //       scheduleOnRN(() => navigation.navigate("Home"));
  //     }
  //   })
  //   .activeOffsetX([-10, 10])
  //   .activeOffsetX([50, 9999]);

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
      <ButtonText style={{ padding: 20 }} onPress={() => navigation.goBack()}>
        voltar
      </ButtonText>
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
                  selectedService?.id === item.id ? "#6200ee" : "transparent",
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
                    ? "#6200ee"
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
        onPress={() => {
          if (!selectedService || !selectedProfessional || !selectedDateTime) {
            alert("Selecione serviço, profissional e data/hora");
            return;
          }

          const payload = {
            businessId: business.id,
            serviceId: selectedService.id,
            professionalId: selectedProfessional.id,
            date: selectedDateTime.toISOString(),
          };
        }}
      >
        <ButtonText>Agendar</ButtonText>
      </Button>
    </ScreenContainer>
  );
}
