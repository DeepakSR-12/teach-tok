import React, { useCallback } from "react";
import * as WebBrowser from "expo-web-browser";
import { Alert, Text, TouchableOpacity } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import { styles } from "./Styles";
import { useNavigation } from "@react-navigation/native";

WebBrowser.maybeCompleteAuthSession();

interface OAuthButtonsProps {}

const OAuthButtons: React.FC<OAuthButtonsProps> = () => {
  const navigation = useNavigation();
  const { startOAuthFlow } = useOAuth({
    strategy: "oauth_google",
  });

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId && setActive) {
        setActive({ session: createdSessionId });
        navigation.navigate("Dashboard" as never);
      }
    } catch (err: any) {
      Alert.alert(err?.errors[0]?.message);
    }
  }, []);

  return (
    <TouchableOpacity
      style={{ ...styles.secondaryButton, marginBottom: 20 }}
      onPress={onPress}
    >
      <Text style={styles.secondaryButtonText}>Continue with Google</Text>
    </TouchableOpacity>
  );
};

export default OAuthButtons;
