import { useAuth } from "@clerk/clerk-expo";
import { useState, useEffect } from "react";
import { Text } from "react-native";

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

  return <Text className="text-white ml-1">{timeElapsed}s</Text>;
}

export default Timer;
