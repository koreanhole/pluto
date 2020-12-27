import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import HomeStackNavigator from "./stack/HomeStackNavigator";
import FavoriteStackNavigator from "./stack/FavoriteStackNavigator";
import AllArticleStackNavigator from "./stack/AllArticleStackNavigator";
import MoreStackNavigator from "./stack/MoreStackNavigator";
import theme from "theme";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

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
        showLabel: true,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: "홈",
          tabBarIcon: ({ focused, color, size }) => {
            // FIXME: https://github.com/expo/vector-icons/issues/153 이 이슈 해결되면 수정
            const iconName: any = focused ? "home" : "home-outline";
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="AllArticle"
        component={AllArticleStackNavigator}
        options={{
          tabBarLabel: "전체 부서",
          tabBarIcon: ({ focused, color, size }) => {
            // FIXME: https://github.com/expo/vector-icons/issues/153 이 이슈 해결되면 수정
            const iconName: any = focused ? "book-open" : "book-open-outline";
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteStackNavigator}
        options={{
          tabBarLabel: "저장",
          tabBarIcon: ({ focused, color, size }) => {
            // FIXME: https://github.com/expo/vector-icons/issues/153 이 이슈 해결되면 수정
            const iconName: any = focused ? "heart" : "heart-outline";
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="More"
        component={MoreStackNavigator}
        options={{
          tabBarLabel: "더보기",
          tabBarIcon: ({ color, size }) => {
            return <MaterialIcons name="more-horiz" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
