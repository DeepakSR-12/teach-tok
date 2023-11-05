import React, { useState } from "react";
import { View, TouchableOpacity, Text, Modal, Alert } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { isSignedIn, signOut } = useAuth();
  const navigation = useNavigation();

  const handleSignOut = async () => {
    await signOut()?.then(() => navigation.navigate("Landing" as never));
    Alert.alert("You are successfully signed out");
    setModalVisible(false);
  };

  return (
    <View className="flex flex-row items-center p-5 justify-between">
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            isSignedIn ? ("Home" as never) : ("Landing" as never)
          )
        }
        className="flex-row flex-start items-center mt-3"
      >
        <MaterialCommunityIcons
          name="book-education-outline"
          size={28}
          color="white"
        />
        <Text className="text-3xl ml-4 font-bold text-white">TeachTok</Text>
      </TouchableOpacity>

      {isSignedIn ? (
        <TouchableOpacity
          className="mt-3"
          onPress={() => setModalVisible(!modalVisible)}
        >
          <FontAwesome name="user" size={32} color="white" />
        </TouchableOpacity>
      ) : null}

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
    </View>
  );
};

export default Navbar;
