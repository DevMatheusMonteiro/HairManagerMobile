import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "../stacks/AuthStack";
import CustomerStack from "../stacks/CustomerStack";
import { useAuth } from "../contexts/AuthContext";
import { ActivityIndicator, View } from "react-native";
import BusinessStack from "../stacks/BusinessStack";

export default function Routes() {
  const { user, loading, profile } = useAuth();

  if (loading && !profile) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  const AppStack = () => {
    return profile?.role === "customer" ? <CustomerStack /> : <BusinessStack />;
  };

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
