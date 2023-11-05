import React from "react";
import TypeWriter from "@sucho/react-native-typewriter";
import { useNavigation } from "@react-navigation/native";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { useAuth } from "@clerk/clerk-expo";

const BACKGROUND = "#263238";

export default function LandingHero() {
  const { isSignedIn } = useAuth();
  const navigation = useNavigation();

  const strings = [
    "Ignite curiosity.",
    "Learn. Thrive.",
    "Quiz. Elevate.",
    "Share knowledge.",
  ];

  return (
    <View>
      <View className="py-20 items-center font-extrabold">
        <Text className="text-white mb-4 px-4 font-bold text-4xl">
          The Best Tool to
        </Text>

        <View className="h-10">
          <TypeWriter
            textArray={strings}
            loop
            speed={150}
            delay={1500}
            textStyle={styles.typeWriterText}
            cursorStyle={styles.typeWriterCursorText}
          />
        </View>
      </View>

      <View className="mx-12 space-y-5 items-center">
        <Text className="text-md font-light text-zinc-400">
          Learn 10x faster.
        </Text>

        <TouchableOpacity
          className="font-semibold bg-white p-2 rounded-full"
          onPress={() =>
            navigation.navigate(isSignedIn ? "Dashboard" : "SignUp")
          }
        >
          <Text className="text-lg text-center font-bold">Start For Free</Text>
        </TouchableOpacity>

        <Text className="text-md font-light text-zinc-400">
          No credit card required.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: BACKGROUND,
    justifyContent: "center",
  },
  typeWriterText: {
    color: "#db2777",
    backgroundColor: "transparent",
    fontSize: 32,
    fontWeight: "500",
  },
  typeWriterCursorText: {
    fontSize: 0,
    color: "#111827",
  },
});
