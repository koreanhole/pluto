import * as React from "react";
import { View, FlatList, RefreshControl } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import AppLayout from "modules/AppLayout";
import NoticeCard from "./NoticeCard";
import { NoticeArticle } from "components/Article/redux/types";
import styled from "styled-components/native";
import HeaderRightButton from "./HeaderRightButton";
import { getFavoriteDepartmentList } from "../Department/redux/selectors";
import { noticeFirestore } from "util/firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import _ from "underscore";
import { registerForPushNotificationsAsync } from "util/pushNotification";
import { setExpoPushToken } from "components/Department/redux/actions";
import { setArticleId } from "components/Article/redux/actions";
import * as Notifications from "expo-notifications";
import LoadingIndicator from "modules/LoadingIndicator";
import theme from "theme";

const HomeContainer = styled(View)`
  flex: 1;
`;

export default function Home() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const favoriteDepartmentList = useSelector(getFavoriteDepartmentList);
  const [flatListData, setFlatListData] = React.useState<NoticeArticle[]>();
  const [initialLoading, setInitialLoading] = React.useState(true);

  const fetchInitialNotice = () => {
    const query = noticeFirestore
      .where("deptName", "in", favoriteDepartmentList)
      .orderBy("createdDateTimestamp", "desc")
      .limit(50);
    setInitialLoading(true);
    query.get().then((documentSnapshots) => {
      const fetchedNoticeData: NoticeArticle[] = documentSnapshots.docs.map(
        (document) => {
          const fetchedData = document.data();
          return {
            createdDateTimestamp: fetchedData.createdDateTimestamp,
            deptCode: fetchedData.deptCode,
            deptName: fetchedData.deptName,
            authorDept: fetchedData.authorDept,
            title: fetchedData.title,
            createdDate: fetchedData.createdDate,
            authorName: fetchedData.authorName,
            listId: fetchedData.listId,
            favoriteCount: fetchedData.favoriteCount,
          };
        }
      );
      setFlatListData(fetchedNoticeData);
      setInitialLoading(false);
    });
  };

  React.useEffect(fetchInitialNotice, [favoriteDepartmentList]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "UOS 공지사항 😷",
      headerRight: () => <HeaderRightButton />,
    });
  }, [navigation]);

  React.useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      dispatch(setExpoPushToken(token))
    );
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const responseData = response.notification.request.content.data.body;
        navigation.navigate("Article");
        dispatch(
          setArticleId({
            // @ts-ignore Object is of type 'unknown'.ts(2571)
            deptCode: responseData.deptCode,
            // @ts-ignore Object is of type 'unknown'.ts(2571)
            listId: responseData.listId,
          })
        );
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
                refreshing={initialLoading}
                onRefresh={fetchInitialNotice}
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
