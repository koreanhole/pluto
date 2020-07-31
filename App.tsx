import React from "react";
import { Provider } from "react-redux";
import AppNavigator from "navigators/AppNavigator";
import { PersistGate } from "redux-persist/integration/react";
import createReduxStore from "redux/store";

const { store, persistor } = createReduxStore();

export default () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppNavigator />
    </PersistGate>
  </Provider>
);
