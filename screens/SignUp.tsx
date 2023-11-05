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
import OAuthButtons from "../components/OAuth";
import Navbar from "../components/Navbar";
import { useNavigation } from "@react-navigation/native";

interface SignUpScreenProps {}

const SignUpScreen: React.FC<SignUpScreenProps> = () => {
  const { isLoaded, signUp } = useSignUp();
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigation = useNavigation();

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      navigation.navigate("VerifyCode" as never);
    } catch (err: any) {
      Alert.alert(err?.errors[0]?.message);
    }
  };

  const onSignInPress = () => navigation.navigate("SignIn" as never);

  return (
    <SafeAreaView className="flex-1  bg-black">
      <Navbar />
      <View style={styles.container}>
        <View style={styles.oauthView}>
          <OAuthButtons />
        </View>

        <View style={styles.inputView}>
          <TextInput
            autoCapitalize="none"
            value={emailAddress}
            style={styles.textInput}
            placeholder="Email..."
            placeholderTextColor="#000"
            onChangeText={(email) => setEmailAddress(email)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            value={password}
            style={styles.textInput}
            placeholder="Password..."
            placeholderTextColor="#000"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={onSignUpPress}>
          <Text style={styles.primaryButtonText}>Sign up</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text>Already Registered User?</Text>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={onSignInPress}
          >
            <Text style={styles.secondaryButtonText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;
