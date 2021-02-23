import * as React from "react";
import { View, FlatList, RefreshControl, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import AppLayout from "modules/AppLayout";
import NoticeCard from "./NoticeCard";
import { getFavoriteDepartmentList } from "../Department/redux/selectors";
import { useNavigation } from "@react-navigation/native";
import { registerForPushNotificationsAsync } from "util/pushNotification";
import { setExpoPushToken } from "components/Department/redux/actions";
import * as Notifications from "expo-notifications";
import LoadingIndicator from "modules/LoadingIndicator";
import theme from "theme";
import { fetchInitialNoticeListAsync } from "components/Article/redux/actions";
import { getHomeInitialNotice, getNoticeFetchState } from "components/Article/redux/selectors";
import HeaderRightButton from "./HeaderRightButton";
import { useApolloClient } from "@apollo/client";

export default function Home() {
  const client = useApolloClient();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const favoriteDepartmentList = useSelector(getFavoriteDepartmentList);

  const noticeData = useSelector(getHomeInitialNotice);
  const noticeFetchState = useSelector(getNoticeFetchState);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "UOS 공지사항 😷",
      headerRight: () => <HeaderRightButton />,
    });
  }, [navigation]);

  React.useEffect(() => {
    dispatch(
      fetchInitialNoticeListAsync.request({
        departmentList: favoriteDepartmentList,
        pageType: "HOME",
      }),
    );
  }, [favoriteDepartmentList]);

  React.useEffect(() => {
    const token = registerForPushNotificationsAsync();
    registerForPushNotificationsAsync().then((token) => dispatch(setExpoPushToken(token)));

    // when notification tapped -> redirect to article
    const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
      const responseData = response.notification.request.content.data;
      navigation.navigate("Article", {
        // @ts-ignore Object is of type 'unknown'.ts(2571)
        deptCode: responseData.deptCode,
        // @ts-ignore Object is of type 'unknown'.ts(2571)
        listId: responseData.listId,
      });
    });
    return () => subscription.remove();
  }, [navigation]);

  return (
    <AppLayout>
      <View style={HomeStyles.container}>
        {noticeFetchState == "SUCCESS" ? (
          <FlatList
            data={noticeData}
            keyExtractor={(item) => `${item.deptCode}${item.listId}`}
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={() =>
                  dispatch(
                    fetchInitialNoticeListAsync.request({
                      departmentList: favoriteDepartmentList,
                      pageType: "HOME",
                    }),
                  )
                }
                tintColor={theme.colors.primary}
                title="아래로 내려서 공지사항 새로고침"
              />
            }
            renderItem={(data) => (
              <NoticeCard
                deptCode={data.item.deptCode}
                deptName={data.item.deptName}
                authorDept={data.item.authorDept}
                title={data.item.title}
                createdDate={data.item.createdDate}
                authorName={data.item.authorName}
                listId={data.item.listId}
                createdDateTimestamp={data.item.createdDateTimestamp}
              />
            )}
          />
        ) : (
          <LoadingIndicator />
        )}
      </View>
    </AppLayout>
  );
}
const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
