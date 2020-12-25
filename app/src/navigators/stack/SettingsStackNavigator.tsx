import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import Settings from "components/Settings";
import theme from "theme";
import { StyledHeaderIcon } from "./base";

const Stack = createStackNavigator();

export default function SettingsStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
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
          <StyledHeaderIcon
            name="arrow-back"
            size={theme.size.headerIconSize}
          />
        ),
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}
