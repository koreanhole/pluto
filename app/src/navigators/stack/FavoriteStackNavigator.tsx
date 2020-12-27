import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import Favorite from "components/Favorite";
import Article from "components/Article";
import theme from "theme";
import { HeaderIconStyles } from "./base";
import { MaterialIcons } from "@expo/vector-icons";

const Stack = createStackNavigator();

export default function FavoriteStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Favorite"
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
      <Stack.Screen name="Favorite" component={Favorite} />
      <Stack.Screen name="Article" component={Article} />
    </Stack.Navigator>
  );
}
