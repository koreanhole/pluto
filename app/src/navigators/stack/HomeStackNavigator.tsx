import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "components/Home";
import Article from "components/Article";
import Department from "components/Department";
import Search from "components/Search";
import theme from "theme";
import { HeaderIconStyles } from "./base";
import { MaterialIcons } from "@expo/vector-icons";

const Stack = createStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: `${theme.colors.ligthGrey}`,
        },
        headerTitle: "",
        headerTintColor: `${theme.colors.black}`,
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
        },
        headerTitleAlign: "left",
        headerBackImage: () => (
          <MaterialIcons style={HeaderIconStyles.materialIcons} name="arrow-back" size={theme.size.headerIconSize} />
        ),
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Article" component={Article} />
      <Stack.Screen name="Department" component={Department} />
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
}
