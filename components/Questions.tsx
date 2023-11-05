import {
  ImageBackground,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
} from "react-native";
import {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome,
  Entypo,
} from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import { QuizObject } from "../store";

function Questions({ item }: { item: QuizObject }) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [responseAnswer, setResponseAnswer] = useState<{
    id: number | null;
    option: string | null;
  }>({
    id: null,
    option: null,
  });

  const fetchAnswer = async (id: number) => {
    try {
      const response = await fetch(
        `https://cross-platform.rp.devfactory.com/reveal?id=${id}`
      )?.then((res) => res?.json());
      setResponseAnswer({ id, option: response?.correct_options[0]?.id });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (item.id) {
      fetchAnswer(item.id);
    }
  }, []);

  const bounceAnim = new Animated.Value(1);

  Animated.loop(
    Animated.sequence([
      Animated.timing(bounceAnim, {
        toValue: 1.2,
        duration: 500,
        easing: Easing.elastic(1),
        useNativeDriver: true,
      }),
      Animated.timing(bounceAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.elastic(1),
        useNativeDriver: true,
      }),
    ])
  ).start();

  return (
    <View className="flex h-screen">
      <View className="absolute top-16 left-0 right-0 z-10">
        <Header />
      </View>
      <ImageBackground
        className="flex overflow-scroll"
        source={{ uri: item?.image }}
      >
        <StatusBar barStyle="light-content" />
        <SafeAreaView className="p-8 h-full">
          <View className="flex p-4 mt-32">
            <View className="bg-[#000000AF] rounded-md">
              <Text className="inline-block align-middle p-2 text-white text-xl font-semibold">
                {item?.question}
              </Text>
            </View>
          </View>

          <View className="absolute pr-6 bottom-20">
            <View className="flex flex-row p-4">
              <View className="flex w-10/12">
                {item?.options.map(({ id, answer }) => (
                  <TouchableOpacity
                    key={id}
                    className={`flex flex-row items-center space-x-3 rounded-md p-4 bg-[#FFFFFF7A] my-1 ${
                      selectedAnswer === id &&
                      selectedAnswer === responseAnswer?.option &&
                      "bg-green-400 transition duration-500 ease-in-out"
                    } ${
                      selectedAnswer === id &&
                      selectedAnswer !== responseAnswer?.option &&
                      "bg-red-400 transition duration-500 ease-in-out"
                    } ${
                      selectedAnswer &&
                      id === responseAnswer?.option &&
                      selectedAnswer !== responseAnswer?.option &&
                      "bg-green-400"
                    }`}
                    onPress={() => setSelectedAnswer(id)}
                  >
                    <Text
                      style={{
                        textShadowColor: "black",
                        textShadowOffset: { width: 2, height: 2 },
                        textShadowRadius: 5,
                      }}
                      className="w-10/12 font-bold text-white text-base "
                    >
                      {answer}
                    </Text>

                    <Animated.View
                      style={{
                        transform: [
                          {
                            scale: bounceAnim,
                          },
                        ],
                      }}
                    >
                      <View className="-scale-x-100">
                        {selectedAnswer &&
                          id === selectedAnswer &&
                          selectedAnswer === responseAnswer?.option && (
                            <Entypo
                              className="animate-bounce"
                              name="thumbs-up"
                              size={24}
                              color="green"
                            />
                          )}
                      </View>

                      {selectedAnswer &&
                        id === selectedAnswer &&
                        selectedAnswer !== responseAnswer?.option && (
                          <Entypo
                            className="animate-bounce"
                            name="thumbs-down"
                            size={24}
                            color="red"
                          />
                        )}
                    </Animated.View>
                  </TouchableOpacity>
                ))}

                <View className="mt-4 pl-2">
                  <Text className="text-white font-semibold text-base">
                    {item?.user.name}
                  </Text>

                  <Text className="text-white w-72 mt-2">
                    {item?.description.split("#")[0]}
                  </Text>
                  <Text className="text-white font-bold w-72">
                    #{item?.description.split("#")[1]}
                  </Text>
                </View>
              </View>

              <View className="flex items-center space-y-4 relative ml-4 w-2/12">
                <TouchableOpacity className="border border-white rounded-full">
                  <Image
                    source={{ uri: item?.user.avatar }}
                    alt="image"
                    className="w-10 h-10"
                  />
                </TouchableOpacity>
                <TouchableOpacity className="absolute top-3 bg-white rounded-full">
                  <AntDesign
                    name="pluscircle"
                    size={20}
                    color="rgb(77 124 15)"
                  />
                </TouchableOpacity>
                <TouchableOpacity className="flex items-center">
                  <Ionicons name="heart" size={32} color="white" />
                  <Text className="text-white">87</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex items-center">
                  <Ionicons
                    name="chatbubble-ellipses"
                    size={32}
                    color="white"
                  />
                  <Text className="text-white">2</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex items-center">
                  <FontAwesome name="bookmark" size={32} color="white" />
                  <Text className="text-white">203</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex items-center">
                  <MaterialCommunityIcons
                    name="share"
                    size={40}
                    color="white"
                  />
                  <Text className="text-white">17</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View className="flex flex-0 justify-end">
              <View className="flex flex-row items-center justify-between px-8 bg-black opacity-80 py-3 space-x-2">
                <View className="flex flex-row justify-between space-x-2 items-center">
                  <MaterialCommunityIcons
                    name="clipboard-play-multiple"
                    size={24}
                    color="white"
                  />
                  <Text className="text-white">
                    <Text className="font-bold">Playlist ·</Text>{" "}
                    {item?.playlist}
                  </Text>
                </View>
                <Entypo name="chevron-right" size={24} color="white" />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

export default React.memo(Questions);
