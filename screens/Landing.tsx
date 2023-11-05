import { SafeAreaView, ScrollView, View } from "react-native";
import Navbar from "../components/Navbar";
import LandingHero from "../components/LandingHero";

interface LandingProps {}

const Landing: React.FC<LandingProps> = () => {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <View>
        <Navbar />
        <ScrollView>
          <LandingHero />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Landing;
