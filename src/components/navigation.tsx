import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "./home";
import { DetailsScreen } from "./details";

export type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

const HomeNavigator = () => (
  <Navigator headerMode="none">
    <Screen name="Home" component={HomeScreen} />
    <Screen name="Details" component={DetailsScreen} />
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator />
  </NavigationContainer>
);
