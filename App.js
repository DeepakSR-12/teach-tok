import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigator from "./components/Navigator";
import * as SecureStore from "expo-secure-store";

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const CLERK_PUBLISHABLE_KEY = "1234";

export default function App() {
  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <SafeAreaProvider>
        <NavigationContainer>
          <ClerkLoaded>
            <Navigator />
          </ClerkLoaded>
        </NavigationContainer>
      </SafeAreaProvider>
    </ClerkProvider>
  );
}
