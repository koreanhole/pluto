import React from "react";
import { LogBox } from "react-native";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { Provider as StoreProvider } from "react-redux";
import RootNavigator from "navigators/RootNavigator";
import createReduxStore from "redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const { store, persistor } = createReduxStore();

export const client = new ApolloClient({
  uri: "http://pluto-server.ap-northeast-2.elasticbeanstalk.com/",
  cache: new InMemoryCache(),
});

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
    <ApolloProvider client={client}>
      <StoreProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ActionSheetProvider>
            <PaperProvider theme={theme}>
              <RootNavigator />
            </PaperProvider>
          </ActionSheetProvider>
        </PersistGate>
      </StoreProvider>
    </ApolloProvider>
  );
}
