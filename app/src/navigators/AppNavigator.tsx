import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "components/Home";
import Article from "components/Article";
import Department from "components/Department";
import theme from "theme";
import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components/native";

const Stack = createStackNavigator();

const StyledHeaderIcon = styled(MaterialIcons)`
  margin-left: 10px;
  color: ${theme.colors.black};
`;
const PageNavigation = () => (
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
        <StyledHeaderIcon name="arrow-back" size={theme.size.headerIconSize} />
      ),
      headerBackTitleVisible: false,
    }}
  >
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
