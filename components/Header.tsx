import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Timer from "./Timer";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <View className="flex flex-row justify-between items-center px-4 py-2">
      <View className="flex flex-row justify-center items-center">
        <Ionicons name="stopwatch" size={24} color="#FFFFFFAA" />
        <View className="w-32">
          <Timer />
        </View>
      </View>
      <View className="flex items-center justify-center ml-4 mr-32">
        <Text className="text-base text-white font-bold">For You</Text>
        <View className="border-b-4 border-white w-8 pb-1" />
      </View>
      <TouchableOpacity className="pr-2">
        <Ionicons name="ios-search" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
