// navigation/Routes.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "../stacks/AuthStack";
// import AppStack from "./AppStack"; // stack para usuário logado
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
      <AuthStack />
    </NavigationContainer>
  );
}
