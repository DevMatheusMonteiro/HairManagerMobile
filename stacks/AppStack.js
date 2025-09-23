import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/app/Home";
import BusinessDetail from "../screens/app/BusinessDetail";
import Header from "../components/Header";

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ header: () => <Header /> }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="BusinessDetail" component={BusinessDetail} />
    </Stack.Navigator>
  );
}
