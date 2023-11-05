import { useAuth } from "@clerk/clerk-expo";
import { useState, useEffect } from "react";
import { Text } from "react-native";

function Timer() {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const { isSignedIn } = useAuth();

  useEffect(() => {
    let interval = null;

    if (isSignedIn) {
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isSignedIn]);

  return <Text className="text-white ml-1">{timeElapsed}s</Text>;
}

export default Timer;
