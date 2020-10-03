import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import HomeStackNavigator from "./stack/HomeStackNavigator";
import FavoriteStackNavigator from "./stack/FavoriteStackNavigator";
import theme from "theme";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: theme.colors.primary,
        style: {
          backgroundColor: theme.colors.ligthGrey,
        },
        showLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: "홈",
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = focused ? "home" : "home-outline";
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteStackNavigator}
        options={{
          tabBarLabel: "저장",
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = focused ? "favorite" : "favorite-border";
            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
