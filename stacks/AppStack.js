import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContent,
  DrawerView,
} from "@react-navigation/drawer";
import HomeStack from "./HomeStack";

import Header from "../components/Header";
import { Ionicons } from "@expo/vector-icons";
import { ButtonText } from "../styles/GlobalStyles";

import { useTheme } from "../contexts/ThemeContext";
import Home from "../screens/app/Home";
import MyAppointments from "../screens/app/MyAppointments";
import { View } from "react-native";
import { useAuth } from "../contexts/AuthContext";

const Drawer = createDrawerNavigator();

export default function AppStack() {
  const { theme } = useTheme();
  const { profile } = useAuth();
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <>
          <Header
            style={{
              borderRightWidth: 2,
              borderRightColor: theme.colors.border,
            }}
          />
          <DrawerContentScrollView
            style={{
              backgroundColor: theme.colors.background,
            }}
          >
            <DrawerItemList {...props} />
          </DrawerContentScrollView>
        </>
      )}
      screenOptions={{
        drawerActiveBackgroundColor: theme.colors.secondary,
        drawerActiveTintColor: "#fff",
        drawerItemStyle: { marginBlock: 8 },
        drawerInactiveBackgroundColor: theme.colors.surface,
        drawerInactiveTintColor: theme.colors.textSecondary,
        headerTintColor: theme.colors.textPrimary,
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerTitleContainerStyle: {
          display: "none",
        },
      }}
      initialRouteName="Schedule"
    >
      <Drawer.Screen
        name="Schedule"
        component={HomeStack}
        options={{ title: "Agendar" }}
      />
      <Drawer.Screen
        name="Appointments"
        component={MyAppointments}
        options={{ title: "Meus Agendamentos" }}
      />
    </Drawer.Navigator>
  );
}
