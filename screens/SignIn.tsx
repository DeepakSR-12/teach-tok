import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import OAuthButtons from "../components/OAuth";
import { styles } from "../components/Styles";
import Navbar from "../components/Navbar";
import { useNavigation } from "@react-navigation/native";

interface SignInScreenProps {}

const SignInScreen: React.FC<SignInScreenProps> = () => {
  const { signIn, setSession, isLoaded } = useSignIn();

  const navigation = useNavigation();

  const [emailAddress, setEmailAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      await setSession(completeSignIn.createdSessionId);
      navigation.navigate("Dashboard" as never);
    } catch (err: any) {
      Alert.alert(err?.errors[0]?.message);
    }
  };

  const onSignUpPress = () => navigation.navigate("SignUp" as never);

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
            onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
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

        <TouchableOpacity style={styles.primaryButton} onPress={onSignInPress}>
          <Text style={styles.primaryButtonText}>Sign in</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text>New User?</Text>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={onSignUpPress}
          >
            <Text style={styles.secondaryButtonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;
