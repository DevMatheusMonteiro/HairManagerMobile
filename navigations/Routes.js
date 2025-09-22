import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "../stacks/AuthStack";
import AppStack from "../stacks/AppStack";
import { useAuth } from "../contexts/AuthContext";
import { ActivityIndicator, View } from "react-native";

export default function Routes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
