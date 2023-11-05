import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { styles } from "../components/Styles";
import Navbar from "../components/Navbar";
import { useNavigation } from "@react-navigation/native";

interface VerifyCodeScreenProps {}

const VerifyCodeScreen: React.FC<VerifyCodeScreenProps> = () => {
  const { isLoaded, signUp, setSession } = useSignUp();

  const [code, setCode] = useState("");
  const navigation = useNavigation();

  const onPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setSession(completeSignUp.createdSessionId);

      navigation.navigate("Dashboard" as never);
    } catch (err: any) {
      Alert.alert(err?.errors[0]?.longMessage);
    }
  };

  return (
    <SafeAreaView className="flex-1  bg-[#111827]">
      <Navbar />
      <View style={styles.container}>
        <View style={styles.inputView}>
          <TextInput
            value={code}
            style={styles.textInput}
            placeholder="Code..."
            placeholderTextColor="#000"
            onChangeText={(code) => setCode(code)}
          />
        </View>
        <TouchableOpacity style={styles.primaryButton} onPress={onPress}>
          <Text style={styles.primaryButtonText}>Verify Email</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default VerifyCodeScreen;
