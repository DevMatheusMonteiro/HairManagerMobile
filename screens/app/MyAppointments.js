import { useEffect, useState, useCallback } from "react";
import { FlatList, Pressable, Alert, View, Text } from "react-native";
import {
  ScreenContainer,
  Card,
  Title,
  BodyText,
} from "../../styles/GlobalStyles";
import RNPickerSelect from "react-native-picker-select";
import { Swipeable } from "react-native-gesture-handler";

import {
  findAppointmentsByCustomer,
  updateAppointmentStatus,
} from "../../services/appointmentService";
import { useAuth } from "../../contexts/AuthContext";

export default function MyAppointments({ navigation }) {
  const { profile } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [statusFilter, setStatusFilter] = useState("requested");
  const [refreshing, setRefreshing] = useState(false);

  // Buscar agendamentos do usuário
  async function fetchAppointments() {
    try {
      const res = await findAppointmentsByCustomer({
        customer_id: profile.id,
        status: statusFilter,
      });
      setAppointments(res);
    } catch (e) {
      console.error(e);
    }
  }

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchAppointments();
    setRefreshing(false);
  }, [statusFilter]);

  useEffect(() => {
    fetchAppointments();
  }, [statusFilter]);

  // Cancelar agendamento
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
              fetchAppointments();
            } catch (e) {
              console.error(e);
            }
          },
        },
      ]
    );
  }

  // Renderiza cada card com Swipeable
  function renderAppointmentCard(appointment) {
    const renderRightActions = () => {
      if (appointment.status !== "requested") return null;

      return (
        <Pressable
          style={{
            backgroundColor: "red",
            justifyContent: "center",
            alignItems: "center",
            width: 100,
            marginVertical: 8,
            borderRadius: 8,
          }}
          onPress={() => handleCancelAppointment(appointment)}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Cancelar</Text>
        </Pressable>
      );
    };

    return (
      <Swipeable renderRightActions={renderRightActions}>
        <Card shadow="md" style={{ marginHorizontal: 16, marginVertical: 8 }}>
          <Pressable
            onPress={() =>
              navigation.navigate("BusinessDetail", {
                businessId: appointment.businesses.id,
              })
            }
          >
            <Title>{appointment.businesses.name}</Title>
            <BodyText>Status: {appointment.status}</BodyText>
            <BodyText>Serviço: {appointment.services.name}</BodyText>
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
      {/* Filtro de status */}
      <View style={{ marginHorizontal: 16, marginBottom: 8 }}>
        <RNPickerSelect
          onValueChange={(value) => setStatusFilter(value)}
          value={statusFilter}
          items={[
            { label: "Solicitado", value: "requested" },
            { label: "Confirmado", value: "confirmed" },
            { label: "Cancelado", value: "canceled" },
            { label: "Concluído", value: "completed" },
          ]}
        />
      </View>

      {/* Lista de agendamentos */}
      <FlatList
        data={appointments}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => renderAppointmentCard(item)}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </ScreenContainer>
  );
}
