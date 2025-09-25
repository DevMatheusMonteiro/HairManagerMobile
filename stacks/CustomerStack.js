import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import HomeStack from "./HomeStack";
import Header from "../components/Header";
import { useTheme } from "../contexts/ThemeContext";
import MyAppointments from "../screens/app/MyAppointments";

const Drawer = createDrawerNavigator();

export default function CustomerStack() {
  const { theme } = useTheme();
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <>
          <Header
            style={{
              borderRightWidth: 1,
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
