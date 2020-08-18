import React from "react";
import { Provider } from "react-redux";
import AppNavigator from "navigators/AppNavigator";
import createReduxStore from "redux/store";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

const store = createReduxStore();

export default function App() {
  return (
    <Provider store={store}>
      <ActionSheetProvider>
        <AppNavigator />
      </ActionSheetProvider>
    </Provider>
  );
}
