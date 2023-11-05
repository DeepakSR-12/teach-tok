import { StatusBar, SafeAreaView } from "react-native";
import React from "react";
import Loader from "../components/Loader";

interface BookmarksProps {}

const Bookmarks: React.FC<BookmarksProps> = () => {
  return (
    <SafeAreaView className="bg-black h-screen">
      <StatusBar barStyle="light-content" />
      <Loader spinNeeded={false} text="Bookmarks Section" />
    </SafeAreaView>
  );
};

export default Bookmarks;
