import { useAuth } from "@clerk/clerk-expo";
import { useState, useEffect } from "react";
import { Text, View } from "react-native";

function Timer() {
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const { isSignedIn, sessionId } = useAuth();

  useEffect(() => {
    let interval: any = null;

    if (isSignedIn && sessionId) {
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isSignedIn, sessionId]);

  const hours = Math.floor(timeElapsed / 3600);
  const minutes = Math.floor((timeElapsed % 3600) / 60);
  const seconds = timeElapsed % 60;

  const hoursElement = !!hours ? `${hours} hr${hours > 1 ? "s" : ""} : ` : null;
  const minutesElement = !!minutes
    ? `${minutes} min${minutes > 1 ? "s" : ""} : `
    : null;
  const secondsElement = !!seconds ? `${seconds} s` : null;

  return (
    <View className="flex flex-wrap ml-2">
      <Text className="text-white">
        {hoursElement}
        {minutesElement}
        {secondsElement}
      </Text>
    </View>
  );
}

export default Timer;
