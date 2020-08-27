import React from "react";
import { YellowBox } from "react-native";
import { Provider } from "react-redux";
import AppNavigator from "navigators/AppNavigator";
import createReduxStore from "redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

const { store, persistor } = createReduxStore();

export default function App() {
  //https://github.com/facebook/react-native/issues/12981
  YellowBox.ignoreWarnings(["Setting a timer"]);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ActionSheetProvider>
          <AppNavigator />
        </ActionSheetProvider>
      </PersistGate>
    </Provider>
  );
}
