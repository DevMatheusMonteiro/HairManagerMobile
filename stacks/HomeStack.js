import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/app/Home";
import BusinessDetail from "../screens/app/BusinessDetail";
const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="HomeStack"
    >
      <Stack.Screen name="HomeStack" component={Home} />
      <Stack.Screen name="BusinessDetail" component={BusinessDetail} />
    </Stack.Navigator>
  );
}
