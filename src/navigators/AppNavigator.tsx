import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../components/Home";
// import Drawer from "../modules/Drawer";

export type RootStackParamList = {
  Home: undefined;
  Details: undefined;
  Drawer: undefined;
};

const StackNavigator = createStackNavigator<RootStackParamList>();
// const DrawerNavigator = createDrawerNavigator();

// const DrawerNavigation = () => (
//   <DrawerNavigator.Navigator drawerContent={(props) => <Drawer {...props} />}>
//     <DrawerNavigator.Screen name="HOME" component={Home} />
//   </DrawerNavigator.Navigator>
// );

const PageNavigation = () => (
  <StackNavigator.Navigator headerMode="none">
    {/* <StackNavigator.Screen name="Drawer" component={DrawerNavigation} /> */}
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
