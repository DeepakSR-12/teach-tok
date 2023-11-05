import { View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { FlatList } from "react-native-bidirectional-infinite-scroll";
import Loader from "../components/Loader";
import Questions from "../components/Questions";
import useAppStore from "../store";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const flatListRef = useRef(null);
  const { data, setData } = useAppStore();

  const fetchQuestions = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const newEntries = [];
      for (let i = 0; i < 5; i++) {
        const response = await fetch(
          "https://cross-platform.rp.devfactory.com/for_you"
        )?.then((data) => data?.json());

        newEntries.push({
          ...response,
          responseAnswer: {
            id: null,
            option: null,
          },
        });
      }

      setData([...data, ...newEntries]);

      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index: data.length - 1,
          viewPosition: 0.5,
        });
      }
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
    setIsInitialLoading(false);
  };

  useEffect(() => {
    setIsInitialLoading(true);
    fetchQuestions();
  }, []);

  return (
    <>
      {isInitialLoading ? (
        <View className="p-8 rounded-lg bg-black h-screen flex flex-row items-center justify-center">
          <Loader text="Content is loading..." />
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          data={data}
          keyExtractor={(item) =>
            `${item.id.toString()}-${Math.floor(Math.random() * 10000)}`
          }
          renderItem={({ item }) => <Questions item={item} />}
          enableAutoscrollToTop={false}
          FooterLoadingIndicator={() =>
            isLoading && (
              <View className="p-8 rounded-lg bg-black h-screen flex flex-row items-center justify-center">
                <Loader text="Content is loading..." />
              </View>
            )
          }
          onEndReachedThreshold={3}
          onEndReached={async () => {
            if (!isLoading) {
              await fetchQuestions();
            }
          }}
          ListFooterComponent={() => isLoading && <Loader />}
        />
      )}
    </>
  );
}
