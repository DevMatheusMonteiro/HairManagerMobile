import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyAppointments from "../screens/app/MyAppointments";
import Header from "../components/Header";
const Stack = createNativeStackNavigator();

export default function BusinessStack() {
  return (
    <Stack.Navigator screenOptions={{ header: () => <Header /> }}>
      <Stack.Screen name="MyAppointments" component={MyAppointments} />
    </Stack.Navigator>
  );
}
