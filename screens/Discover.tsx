import { SafeAreaView, StatusBar } from "react-native";
import React from "react";
import Loader from "../components/Loader";

interface DiscoverProps {}

const Discover: React.FC<DiscoverProps> = () => {
  return (
    <SafeAreaView className="bg-black h-screen">
      <StatusBar barStyle="light-content" />
      <Loader spinNeeded={false} text="Discover Section" />
    </SafeAreaView>
  );
};

export default Discover;
