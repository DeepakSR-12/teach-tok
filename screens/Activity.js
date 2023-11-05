import { SafeAreaView, StatusBar } from "react-native";
import React from "react";
import Loader from "../components/Loader";

export default function Activity() {
  return (
    <SafeAreaView className="bg-black h-screen">
      <StatusBar barStyle="light-content" />
      <Loader spinNeeded={false} text="Activity Section" />
    </SafeAreaView>
  );
}
