import { enableScreens } from "react-native-screens";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import * as React from "react";
import Favorite from "components/Favorite";
import theme from "theme";

enableScreens();
const Stack = createNativeStackNavigator();

export default function FavoriteStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: `${theme.colors.white}`,
        },
        headerLargeTitle: true,
        headerHideShadow: true,
      }}
    >
      <Stack.Screen name="Favorite" component={Favorite} />
    </Stack.Navigator>
  );
}
