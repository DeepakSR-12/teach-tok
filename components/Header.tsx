import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Timer from "./Timer";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <View className="flex flex-row justify-between items-center px-4 py-2">
      <View className="flex flex-row items-center">
        <Ionicons name="stopwatch" size={24} color="#FFFFFFAA" />
        <View className="w-10">
          <Timer />
        </View>
      </View>
      <View className="flex items-center justify-center mr-6">
        <Text className="text-base text-white font-bold">For You</Text>
        <View className="border-b-4 border-white w-8 pb-1" />
      </View>
      <Ionicons name="ios-search" size={24} color="white" />
    </View>
  );
};

export default Header;
