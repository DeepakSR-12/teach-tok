import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Activity from "../screens/Activity";
import Discover from "../screens/Discover";
import Bookmarks from "../screens/Bookmarks";
import Profile from "../screens/Profile";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function Dashboard() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "black",
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ focused }) => {
          let iconName;
          let iconColor;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Discover") {
            iconName = "compass";
          } else if (route.name === "Activity") {
            iconName = "stopwatch";
          } else if (route.name === "Bookmarks") {
            iconName = "bookmark";
          } else if (route.name === "Profile") {
            iconName = "ios-person-circle-sharp";
          }

          iconColor = focused ? "white" : "gray";

          return <Ionicons name={iconName} size={24} color={iconColor} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Discover" component={Discover} />
      <Tab.Screen name="Activity" component={Activity} />
      <Tab.Screen name="Bookmarks" component={Bookmarks} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
