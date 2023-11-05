import { StatusBar, SafeAreaView } from "react-native";
import React from "react";
import Loader from "../components/Loader";

export default function Bookmarks() {
  return (
    <SafeAreaView className="bg-black h-screen">
      <StatusBar barStyle="light-content" />
      <Loader spinNeeded={false} text="Bookmarks Section" />
    </SafeAreaView>
  );
}
