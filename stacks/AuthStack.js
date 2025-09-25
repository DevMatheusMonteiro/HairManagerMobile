import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import Header from "../components/Header";
import SelectRole from "../screens/auth/SelectRole";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ header: () => <Header /> }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SelectRole" component={SelectRole} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}
