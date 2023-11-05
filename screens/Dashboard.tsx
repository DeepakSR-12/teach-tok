import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";
import Activity from "./Activity";
import Discover from "./Discover";
import Bookmarks from "./Bookmarks";
import Profile from "./Profile";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
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

          return (
            <Ionicons name={iconName as any} size={24} color={iconColor} />
          );
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
};

export default Dashboard;
