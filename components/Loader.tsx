import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useRef, useEffect } from "react";
import { View, Text, Animated, Easing } from "react-native";

interface LoaderProps {
  spinNeeded?: boolean;
  text?: string;
}

const Loader: React.FC<LoaderProps> = ({
  spinNeeded = true,
  text = "Content is Loading...",
}) => {
  // Use useRef hook to create and access spinValue
  const spinValue = useRef(new Animated.Value(0)).current;

  // Use useEffect hook to start animation only once
  useEffect(() => {
    // First set up animation
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      {
        iterations: -1, // Set to -1 for infinite loop
      }
    ).start();
  }, []);

  // Next, interpolate beginning and end values (in this case 0 and 1)
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View className="h-full flex flex-col justify-center items-center">
      <View className="w-20 h-20 items-center">
        <Animated.View
          className="w-16 h-16 animate-spin border border-white rounded-full flex items-center justify-center"
          style={spinNeeded ? { transform: [{ rotate: spin }] } : null}
        >
          <MaterialCommunityIcons
            name="book-education-outline"
            size={28}
            color="white"
          />
        </Animated.View>
      </View>
      <Text className="text-sm text-muted-foreground text-white text-center">
        {text}
      </Text>
    </View>
  );
};

export default Loader;
