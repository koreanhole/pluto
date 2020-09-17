import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import * as React from "react";
import HomeStackNavigator from "./stack/HomeStackNavigator";
import FavoriteStackNavigator from "./stack/FavoriteStackNavigator";
import theme from "theme";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createMaterialBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      shifting={true}
      activeColor={theme.colors.primary}
      inactiveColor={theme.colors.black}
      sceneAnimationEnabled={true}
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
              <MaterialCommunityIcons name={iconName} size={25} color={color} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteStackNavigator}
        options={{
          tabBarLabel: "즐겨찾기",
          tabBarColor: theme.colors.ligthGrey,
          tabBarIcon: ({ focused, color }) => {
            let iconName = focused ? "favorite" : "favorite-border";
            return <MaterialIcons name={iconName} size={25} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
