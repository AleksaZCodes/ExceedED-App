import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomeScreen from "./HomeScreen";
import { FONTS } from "../config/constants";

const Tabs = createBottomTabNavigator();

const TabsNavigator = () => {
  const COLORS = useTheme().colors;
  const STYLES = useTheme().styles;

  const styles = StyleSheet.create({
    tabs: {
      backgroundColor: COLORS.background,
      height: 70,
      borderTopColor: COLORS.gray,
      borderTopWidth: 3,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return (
    <Tabs.Navigator
      initialRouteName={"Home"}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "HomeScreen") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Leaderboard") {
            iconName = focused ? "shield" : "shield-outline";
          } else if (route.name === "Account") {
            iconName = focused ? "account" : "account-outline";
          } else if (route.name === "Quiz") {
            iconName = focused
              ? "comment-question"
              : "comment-question-outline";
          }

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarStyle: styles.tabs,
        tabBarShowLabel: false,
        headerShown: false,
        tabBarBadge: "10",
        tabBarBadgeStyle: {
          color: COLORS.background,
          backgroundColor: COLORS.primary,
          fontFamily: FONTS.bold,
        },
      })}
    >
      <Tabs.Screen name="HomeScreen" component={HomeScreen} />
    </Tabs.Navigator>
  );
};

export default TabsNavigator;
