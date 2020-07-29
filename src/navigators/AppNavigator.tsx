import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../components/Home";

export type RootStackParamList = {
  Home: undefined;
  Details: undefined;
  Drawer: undefined;
};

const StackNavigator = createStackNavigator<RootStackParamList>();

const PageNavigation = () => (
  <StackNavigator.Navigator headerMode="none">
    <StackNavigator.Screen name="Home" component={Home} />
  </StackNavigator.Navigator>
);

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <PageNavigation />
    </NavigationContainer>
  );
}
