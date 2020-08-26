import * as React from "react";
import { View, ActivityIndicator, StyleSheet, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import AppLayout from "modules/AppLayout";
import NoticeCard, { NoticeCardItem } from "./NoticeCard";
import styled from "styled-components/native";
import HeaderRightButton from "./HeaderRightButton";
import { getFavoriteDepartmentList } from "../Department/redux/selectors";
import { noticeFirestore } from "util/firebase/firestore";
import { subDays } from "date-fns";
import { useNavigation } from "@react-navigation/native";
import { registerForPushNotificationsAsync } from "util/pushNotification";
import { setExpoPushToken } from "components/Department/redux/actions";
import { setArticleId } from "components/Article/redux/actions";
import * as Notifications from "expo-notifications";
import _ from "underscore";

const HomeContainer = styled(View)`
  flex: 1;
`;

export default function Home() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const favoriteDepartmentList = useSelector(getFavoriteDepartmentList);

  const [flatListData, setFlatListData] = React.useState<NoticeCardItem[]>();
  const [noticeCreatedDate, setNoticeCreatedDate] = React.useState<Date>(
    new Date()
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "UOS 공지사항 🏊",
      headerRight: () => <HeaderRightButton />,
    });
  });

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

  const fetchNoticeData = React.useCallback(
    async (baseTime: Date) => {
      const fiveDaysBefore = subDays(baseTime, 5);
      let noticeQuery = noticeFirestore
        .where("deptName", "in", favoriteDepartmentList)
        .where("createdDateTimestamp", "<", baseTime)
        .where("createdDateTimestamp", ">", fiveDaysBefore)
        .orderBy("createdDateTimestamp", "desc");
      let noticeSnapshot = await noticeQuery.get();
      let fetchedNoticeData: NoticeCardItem[] = noticeSnapshot.docs.map(
        (document) => {
          const fetchedData = document.data();
          return {
            createdDateTimestamp: fetchedData.createdDateTimestamp,
            deptCode: fetchedData.deptCode,
            deptName: fetchedData.deptName,
            authorDept: fetchedData.authorDept,
            title: fetchedData.title,
            date: fetchedData.createdDate,
            author: fetchedData.authorName,
            listId: fetchedData.listId,
          };
        }
      );
      return fetchedNoticeData;
    },
    [favoriteDepartmentList]
  );

  React.useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      dispatch(setExpoPushToken(token))
    );
    const subscription = Notifications.addNotificationResponseReceivedListener(
      handleNotificationResponse
    );
    return () => subscription.remove();
  }, []);

  const fetchInitialNoticeData = () => {
    fetchNoticeData(new Date())
      .then((fetchedNoticeData) => {
        setFlatListData(fetchedNoticeData);
      })
      .finally(() => setNoticeCreatedDate(subDays(new Date(), 5)));
  };

  const fetchMoreNoticeData = () => {
    fetchNoticeData(noticeCreatedDate)
      .then((data) => {
        if (typeof flatListData !== "undefined") {
          setFlatListData(flatListData.concat(data));
        }
      })
      .finally(() => setNoticeCreatedDate(subDays(noticeCreatedDate, 5)));
  };

  React.useEffect(fetchInitialNoticeData, [favoriteDepartmentList]);

  return (
    <AppLayout>
      <HomeContainer>
        {typeof flatListData !== "undefined" ? (
          <FlatList
            data={flatListData}
            keyExtractor={(item, index) => item.title + index}
            onEndReached={fetchMoreNoticeData}
            onEndReachedThreshold={0.3}
            extraData={flatListData}
            scrollIndicatorInsets={{ right: 1 }}
            renderItem={(data) => (
              <NoticeCard
                deptCode={data.item.deptCode}
                deptName={data.item.deptName}
                authorDept={data.item.authorDept}
                title={data.item.title}
                date={data.item.date}
                author={data.item.author}
                listId={data.item.listId}
                createdDateTimestamp={data.item.createdDateTimestamp}
              />
            )}
          />
        ) : (
          <View style={HomeStyles.ActivityIndicatorContainer}>
            <ActivityIndicator />
          </View>
        )}
      </HomeContainer>
    </AppLayout>
  );
}

const HomeStyles = StyleSheet.create({
  ActivityIndicatorContainer: {
    marginTop: 16,
    justifyContent: "center",
  },
});
