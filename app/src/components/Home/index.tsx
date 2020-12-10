import * as React from "react";
import { View, FlatList, RefreshControl, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import AppLayout from "modules/AppLayout";
import NoticeCard from "./NoticeCard";
import { NoticeArticle } from "components/Article/redux/types";
import styled from "styled-components/native";
import { getFavoriteDepartmentList } from "../Department/redux/selectors";
import { noticeFirestore } from "util/firebase/firestore";
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
  // const [flatListData, setFlatListData] = React.useState<NoticeArticle[]>();
  // const [initialLoading, setInitialLoading] = React.useState(true);

  // const fetchInitialNotice = () => {
  //   const query = noticeFirestore
  //     .where("deptName", "in", favoriteDepartmentList)
  //     .orderBy("createdDate", "desc")
  //     .limit(50);
  //   setInitialLoading(true);
  //   query
  //     .get()
  //     .then((documentSnapshots) => {
  //       const fetchedNoticeData: NoticeArticle[] = documentSnapshots.docs.map(
  //         (document) => {
  //           const fetchedData = document.data();
  //           return {
  //             createdDateTimestamp: fetchedData.createdDateTimestamp,
  //             deptCode: fetchedData.deptCode,
  //             deptName: fetchedData.deptName,
  //             authorDept: fetchedData.authorDept,
  //             title: fetchedData.title,
  //             createdDate: fetchedData.createdDate,
  //             authorName: fetchedData.authorName,
  //             listId: fetchedData.listId,
  //             favoriteCount: fetchedData.favoriteCount,
  //           };
  //         }
  //       );
  //       setFlatListData(fetchedNoticeData);
  //       setInitialLoading(false);
  //     })
  //     .catch(() => {
  //       Alert.alert(
  //         "공지사항을 불러올 수 없습니다.",
  //         "잠시 후 다시 시도해주세요ㅠㅠ",
  //         [
  //           {
  //             text: "확인",
  //           },
  //         ]
  //       );
  //     });
  // };

  React.useEffect(() => {
    dispatch(fetchInitialNoticeAsync.request(favoriteDepartmentList));
  }, [favoriteDepartmentList]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "UOS 공지사항 🌺",
    });
  }, [navigation]);

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
                    fetchInitialNoticeAsync.request(favoriteDepartmentList)
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
