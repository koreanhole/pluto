import React from "react";
import { YellowBox } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as StoreProvider } from "react-redux";
import AppNavigator from "navigators/AppNavigator";
import createReduxStore from "redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { registerForPushNotificationsAsync } from "util/pushNotification";
import { setExpoPushToken } from "components/Department/redux/actions";
import { setArticleId } from "components/Article/redux/actions";
import * as Notifications from "expo-notifications";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const { store, persistor } = createReduxStore();

export default function App() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleNotificationResponse = React.useCallback(
    (respone: Notifications.NotificationResponse) => {
      const responseData = respone.notification.request.content.data.body;
      navigation.navigate("Article");
      dispatch(
        setArticleId({
          // @ts-ignore Object is of type 'unknown'.ts(2571)
          deptCode: responseData.deptCode,
          // @ts-ignore Object is of type 'unknown'.ts(2571)
          listId: responseData.listId,
        })
      );
    },
    []
  );
  React.useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      dispatch(setExpoPushToken(token))
    );
    const subscription = Notifications.addNotificationResponseReceivedListener(
      handleNotificationResponse
    );
    return () => subscription.remove();
  }, [navigation]);
  //https://github.com/facebook/react-native/issues/12981
  YellowBox.ignoreWarnings(["Setting a timer"]);
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ActionSheetProvider>
          <PaperProvider>
            <AppNavigator />
          </PaperProvider>
        </ActionSheetProvider>
      </PersistGate>
    </StoreProvider>
  );
}
