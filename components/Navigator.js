import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Landing from "../screens/Landing";
import Dashboard from "../screens/Dashboard";
import SignUpScreen from "../screens/SignUp";
import SignInScreen from "../screens/SignIn";
import VerifyCodeScreen from "../screens/VerifyCodeScreen";
import { useAuth } from "@clerk/clerk-expo";

const Stack = createNativeStackNavigator();

export default function Navigator() {
  const { isSignedIn } = useAuth();
  return (
    <Stack.Navigator
      initialRouteName={isSignedIn ? "Dashboard" : "Landing"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Landing" component={Landing} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="VerifyCode" component={VerifyCodeScreen} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
  );
}
