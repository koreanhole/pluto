import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import * as React from "react";
import HomeStackNavigator from "./stack/HomeStackNavigator";
import SavedArticles from "components/SavedArticles";
import theme from "theme";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createMaterialBottomTabNavigator();
// tabBarColor: theme.colors.ligthGrey,

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      shifting={true}
      activeColor={theme.colors.primary}
      inactiveColor={theme.colors.black}
      sceneAnimationEnabled={false}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: "홈",
          tabBarColor: theme.colors.ligthGrey,
          tabBarIcon: ({ focused, color }) => {
            let iconName = focused ? "home" : "home-outline";
            return (
              <MaterialCommunityIcons name={iconName} size={23} color={color} />
            );
          },
        }}
      />
      <Tab.Screen
        name="SavedArticles"
        component={SavedArticles}
        options={{
          tabBarLabel: "즐겨찾기",
          tabBarColor: theme.colors.ligthGrey,
          tabBarIcon: ({ focused, color }) => {
            let iconName = focused ? "favorite" : "favorite-border";
            return <MaterialIcons name={iconName} size={23} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
