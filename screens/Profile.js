import {
  Image,
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "react-native";
import Navbar from "../components/Navbar";
import { useAuth } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";
import useAppStore from "../store";
import { Alert } from "react-native";

export default function Profile() {
  const [modalVisible, setModalVisible] = useState(false);
  const { signOut } = useAuth();
  const navigation = useNavigation();
  const { data } = useAppStore();

  const handleSignOut = async () => {
    await signOut()?.then(() => navigation.navigate("Landing"));
    Alert.alert("You are successfully signed out");
    setModalVisible(false);
  };

  return (
    <SafeAreaView className="bg-black h-screen">
      <StatusBar barStyle="light-content" />
      <Navbar />
      <View>
        <Text className="text-white text-base font-semibold p-6">
          User Name:{" "}
          <Text className="text-xl font-bold">{data[0]?.user?.name}</Text>
        </Text>
      </View>
      <TouchableOpacity
        className="mt-20 p-4 mx-auto rounded-xl bg-white"
        onPress={() => setModalVisible(!modalVisible)}
      >
        <Text className="text-black">Sign out</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="flex-1 justify-center items-center mt-5">
          <View className="m-5 bg-white rounded-3xl p-9 items-center shadow-md">
            <Text className="mb-4 text-center">
              Are you sure you want to log out?
            </Text>
            <View className="flex-row space-x-2">
              <TouchableOpacity
                className="p-2 border rounded-md"
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text>No</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="p-2 shadow-sm bg-[#192339] border-none  rounded-md"
                onPress={handleSignOut}
              >
                <Text className="text-white">Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
