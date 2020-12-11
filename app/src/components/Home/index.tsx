import * as React from "react";
import { View, FlatList, RefreshControl } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import AppLayout from "modules/AppLayout";
import NoticeCard from "./NoticeCard";
import styled from "styled-components/native";
import { getFavoriteDepartmentList } from "../Department/redux/selectors";
import { useNavigation } from "@react-navigation/native";
import _ from "underscore";
import { registerForPushNotificationsAsync } from "util/pushNotification";
import { setExpoPushToken } from "components/Department/redux/actions";
import * as Notifications from "expo-notifications";
import LoadingIndicator from "modules/LoadingIndicator";
import theme from "theme";
import { fetchInitialNoticeAsync } from "./redux/actions";
import { getInitialNotice, getNoticeFetchState } from "./redux/selectors";

export const HomeContainer = styled(View)`
  flex: 1;
`;

export default function Home() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const favoriteDepartmentList = useSelector(getFavoriteDepartmentList);

  const flatListData = useSelector(getInitialNotice);
  const noticeFetchState = useSelector(getNoticeFetchState);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "UOS 공지사항 🌺",
    });
  }, [navigation]);

  React.useEffect(() => {
    dispatch(
      fetchInitialNoticeAsync.request({
        departmentList: favoriteDepartmentList,
      })
    );
  }, [favoriteDepartmentList]);

  React.useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      dispatch(setExpoPushToken(token))
    );
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const responseData = response.notification.request.content.data;
        navigation.navigate("Article", {
          // @ts-ignore Object is of type 'unknown'.ts(2571)
          deptCode: responseData.deptCode,
          // @ts-ignore Object is of type 'unknown'.ts(2571)
          listId: responseData.listId,
        });
      }
    );
    return () => subscription.remove();
  }, [navigation]);

  return (
    <AppLayout>
      <HomeContainer>
        {typeof flatListData !== "undefined" ? (
          <FlatList
            data={flatListData}
            keyExtractor={(item, index) => item.title + index}
            refreshControl={
              <RefreshControl
                refreshing={noticeFetchState == "FETCHING"}
                onRefresh={() =>
                  dispatch(
                    fetchInitialNoticeAsync.request({
                      departmentList: favoriteDepartmentList,
                    })
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
                favoriteCount={data.item.favoriteCount}
              />
            )}
          />
        ) : (
          <LoadingIndicator />
        )}
      </HomeContainer>
    </AppLayout>
  );
}
