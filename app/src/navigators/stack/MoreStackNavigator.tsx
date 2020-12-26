import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import More from "components/More";
import theme from "theme";
import { StyledHeaderIcon } from "./base";

const Stack = createStackNavigator();

export default function MoreStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="More"
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
      <Stack.Screen name="More" component={More} />
    </Stack.Navigator>
  );
}
