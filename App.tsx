import React from "react";
import { Provider } from "react-redux";
import AppNavigator from "navigators/AppNavigator";
import createReduxStore from "redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

const { store, persistor } = createReduxStore();

export default function App() {
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
