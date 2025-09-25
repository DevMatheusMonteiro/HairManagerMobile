import { useEffect, useState, useCallback } from "react";
import { FlatList, Pressable, Alert, View } from "react-native";
import {
  ScreenContainer,
  Card,
  Title,
  BodyText,
  Button,
  ButtonText,
} from "../../styles/GlobalStyles";
import RNPickerSelect from "react-native-picker-select";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";

import {
  findAppointmentsByBusiness,
  findAppointmentsByCustomer,
  updateAppointmentStatus,
} from "../../services/appointmentService";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { sendEmail } from "../../services/authService";
import { Ionicons } from "@expo/vector-icons";

export default function MyAppointments({ navigation }) {
  const options = [
    { label: "Solicitado", value: "requested" },
    { label: "Confirmado", value: "confirmed" },
    { label: "Cancelado", value: "canceled" },
    { label: "Concluído", value: "completed" },
  ];
  const { profile } = useAuth();
  const { theme } = useTheme();
  const [appointments, setAppointments] = useState([]);
  const [statusFilter, setStatusFilter] = useState("requested");
  const [refreshing, setRefreshing] = useState(true);

  function displayStatus(status) {
    return options.find((item) => item.value === status).label;
  }

  async function fetchAppointments() {
    try {
      setRefreshing(true);
      const res =
        profile.role == "customer"
          ? await findAppointmentsByCustomer({
              customer_id: profile.id,
              status: statusFilter ?? "requested",
            })
          : await findAppointmentsByBusiness({
              business_id: profile.id,
              status: statusFilter ?? "requested",
            });
      setAppointments(res);
    } catch (e) {
      console.error(e);
    } finally {
      setRefreshing(false);
    }
  }

  const onRefresh = useCallback(async () => {
    await fetchAppointments();
  }, [statusFilter]);

  useEffect(() => {
    if (!profile) return;
    fetchAppointments();
  }, [statusFilter, profile]);

  async function handleConfirmAppointment(appointment) {
    if (appointment.status !== "requested") {
      Alert.alert(
        "Atenção",
        "Só é possível confirmar agendamentos solicitados."
      );
      return;
    }

    Alert.alert(
      "Confirmar agendamento",
      "Tem certeza que deseja confirmar este agendamento?",
      [
        { text: "Não", style: "cancel" },
        {
          text: "Sim",
          onPress: async () => {
            try {
              await updateAppointmentStatus(appointment.id, "confirmed");
              await sendEmail({
                subject: "Serviço Confirmado",
                html: `
                  ${`<p>${
                    appointment.services.name
                  } confirmado pelo estabelecimento ${profile.name}</p>
                      <p>Data: ${new Date(
                        appointment.date
                      ).toLocaleString()}</p>
                      `}
                `,
              });
              fetchAppointments();
            } catch (e) {
              console.error(e);
            }
          },
        },
      ]
    );
  }

  async function handleCancelAppointment(appointment) {
    if (appointment.status !== "requested") {
      Alert.alert(
        "Atenção",
        "Só é possível cancelar agendamentos ainda não confirmados."
      );
      return;
    }

    Alert.alert(
      "Cancelar agendamento",
      "Tem certeza que deseja cancelar este agendamento?",
      [
        { text: "Não", style: "cancel" },
        {
          text: "Sim",
          onPress: async () => {
            try {
              await updateAppointmentStatus(appointment.id, "canceled");
              await sendEmail({
                subject: "Serviço Cancelado",
                html: `
                  ${
                    profile.role === "customer"
                      ? `<p>${appointment.services.name} cancelado pelo cliente ${profile.name}</p>`
                      : `<p>${appointment.services.name} cancelado pelo estabelecimento ${profile.name}</p>`
                  }
                `,
              });
              fetchAppointments();
            } catch (e) {
              console.error(e);
            }
          },
        },
      ]
    );
  }

  function renderAppointmentCard(appointment) {
    const renderRightActions = () => {
      if (appointment.status !== "requested") return null;

      return (
        <Button
          style={{
            width: 100,
            height: 100,
            padding: 0,
            alignSelf: "center",
          }}
          onPress={() => handleCancelAppointment(appointment)}
        >
          <ButtonText>
            <Ionicons name="trash-bin-sharp" size={24} />
          </ButtonText>
        </Button>
      );
    };

    const renderLeftActions = () => {
      if (appointment.status !== "requested" || profile.role !== "business")
        return null;

      return (
        <Button
          pointerEvents="box-only"
          style={{
            backgroundColor: "#0ae026ff",
            width: 100,
            height: 100,
            padding: 0,
            alignSelf: "center",
          }}
          onPress={() => handleConfirmAppointment(appointment)}
        >
          <ButtonText>
            <Ionicons name="checkmark-circle-sharp" size={24} />
          </ButtonText>
        </Button>
      );
    };

    return (
      <Swipeable
        enableTrackpadTwoFingerGesture={true}
        renderRightActions={renderRightActions}
        renderLeftActions={renderLeftActions}
        onSwipeableOpen={(direction) => {
          if (appointment.status === "requested") {
            if (direction === "right" && profile.role === "business")
              handleConfirmAppointment(appointment);
            if (direction === "left") handleCancelAppointment(appointment);
          }
        }}
      >
        <Card
          shadow="xl"
          style={{
            marginHorizontal: 16,
            marginVertical: 8,
          }}
        >
          <Pressable
            onPress={() => {
              if (profile.role !== "customer") return;
              navigation.navigate("Schedule", {
                screen: "BusinessDetail",
                params: { businessId: appointment.businesses.id },
              });
            }}
          >
            <Title>{appointment.services.name}</Title>
            <BodyText>Status: {displayStatus(appointment.status)}</BodyText>
            <BodyText>
              Data: {new Date(appointment.date).toLocaleString()}
            </BodyText>
          </Pressable>
        </Card>
      </Swipeable>
    );
  }

  return (
    <ScreenContainer>
      <View style={{ marginHorizontal: 16, marginBottom: 8 }}>
        <RNPickerSelect
          disabled={refreshing}
          placeholder={{ label: "Selecione um status", value: null }}
          activeItemStyle={{
            color: theme.colors.secondary,
            backgroundColor: theme.colors.background,
          }}
          dropdownItemStyle={{
            color: theme.colors.textPrimary,
            backgroundColor: theme.colors.surface,
          }}
          onValueChange={(value) => setStatusFilter(value)}
          value={statusFilter}
          items={options}
        />
      </View>

      {refreshing ? (
        <BodyText style={{ alignSelf: "center" }}>Carregando...</BodyText>
      ) : appointments.length > 0 ? (
        <FlatList
          data={appointments}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => renderAppointmentCard(item)}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      ) : (
        <BodyText style={{ alignSelf: "center" }}>
          Nenhum agendamento encontrado
        </BodyText>
      )}
    </ScreenContainer>
  );
}
