import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "components/Home";
import Article from "components/Article";
import Department from "components/Department";

const Stack = createStackNavigator();

const PageNavigation = () => (
  <Stack.Navigator headerMode="none" initialRouteName="Home">
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Article" component={Article} />
    <Stack.Screen name="Department" component={Department} />
  </Stack.Navigator>
);

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <PageNavigation />
    </NavigationContainer>
  );
}
