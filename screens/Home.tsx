import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native-bidirectional-infinite-scroll";
import Loader from "../components/Loader";
import Questions from "../components/Questions";
import useAppStore from "../store";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(false);
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
          onEndReached={fetchQuestions}
          ListFooterComponent={() => isLoading && <Loader />}
          onStartReached={undefined as any}
        />
      )}
    </>
  );
};

export default Home;
