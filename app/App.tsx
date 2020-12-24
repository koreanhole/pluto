import React from "react";
import { LogBox } from "react-native";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { Provider as StoreProvider } from "react-redux";
import RootNavigator from "navigators/RootNavigator";
import createReduxStore from "redux/store";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

const store = createReduxStore();

export default function App() {
  //https://github.com/facebook/react-native/issues/12981
  LogBox.ignoreLogs(["Setting a timer"]);

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "#0a4e9b",
    },
  };

  return (
    <StoreProvider store={store}>
      <ActionSheetProvider>
        <PaperProvider theme={theme}>
          <RootNavigator />
        </PaperProvider>
      </ActionSheetProvider>
    </StoreProvider>
  );
}
