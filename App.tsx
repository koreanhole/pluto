import React from "react";
import { Provider } from "react-redux";
import AppNavigator from "navigators/AppNavigator";
import { createReduxStore } from "redux/store";

const store = createReduxStore();

export default () => (
  <Provider store={store}>
    <AppNavigator />
  </Provider>
);
