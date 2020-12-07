import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import HomeStackNavigator from "./stack/HomeStackNavigator";
import FavoriteStackNavigator from "./stack/FavoriteStackNavigator";
import AllArticleStackNavigator from "./stack/AllArticleStackNavigator";
import DepartmentStackNavigator from "./stack/DepartmentStackNavigator";
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
        name="AllArticle"
        component={AllArticleStackNavigator}
        options={{
          tabBarLabel: "전체 공지사항",
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = focused ? "book-open" : "book-open-outline";
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
            let iconName = focused ? "bookmark" : "bookmark-border";
            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Department"
        component={DepartmentStackNavigator}
        options={{
          tabBarLabel: "알림설정",
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = focused ? "bell" : "bell-outline";
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
    </Tab.Navigator>
  );
}
