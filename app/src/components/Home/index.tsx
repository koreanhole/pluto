import * as React from "react";
import { View, SectionList, ActivityIndicator, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import AppLayout from "modules/AppLayout";
import NoticeCard, { NoticeCardItem, NoticeCardHeader } from "./NoticeCard";
import styled from "styled-components/native";
import HeaderRightButton from "./HeaderRightButton";
import { getFavoriteDepartmentList } from "../Department/redux/selectors";
import { noticeFirestore } from "util/firebase/firestore";
import { subDays } from "date-fns";
import { useNavigation } from "@react-navigation/native";
import _ from "underscore";
import { getDescriptiveDateDifference } from "./util";
import { registerForPushNotificationsAsync } from "util/pushNotification";
import { setExpoPushToken } from "components/Department/redux/actions";
import { setArticleId } from "components/Article/redux/actions";
import * as Notifications from "expo-notifications";
import { Button } from "react-native-paper";

type SectionListData = {
  data: NoticeCardItem[];
};

const HomeContainer = styled(View)`
  flex: 1;
`;

export default function Home() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const favoriteDepartmentList = useSelector(getFavoriteDepartmentList);

  const [isRefreshing, setIsRefreshing] = React.useState(true);
  const [sectionListData, setSectionListData] = React.useState<
    SectionListData[]
  >();
  // const [flatListData, setFlatListData] = React.useState<NoticeCardItem[]>();
  const [noticeCreatedDate, setNoticeCreatedDate] = React.useState<Date>(
    new Date()
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "UOS 공지사항 😷",
      headerRight: () => <HeaderRightButton />,
    });
  });

  const fetchNoticeData = React.useCallback(
    async (baseTime: Date) => {
      const fiveDaysBefore = subDays(baseTime, 1);
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

  const fetchInitialNoticeData = () => {
    fetchNoticeData(new Date())
      .then((fetchedNoticeData) => {
        setSectionListData([{ data: fetchedNoticeData }]);
      })
      .finally(() => {
        setNoticeCreatedDate(subDays(new Date(), 1));
        setIsRefreshing(false);
      });
  };

  const fetchMoreNoticeData = () => {
    fetchNoticeData(noticeCreatedDate)
      .then((fetchedNoticeData) => {
        if (typeof sectionListData !== "undefined") {
          setSectionListData([...sectionListData, { data: fetchedNoticeData }]);
        }
      })
      .finally(() => {
        setNoticeCreatedDate(subDays(noticeCreatedDate, 1));
        setIsRefreshing(false);
      });
  };

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

  React.useEffect(fetchInitialNoticeData, [favoriteDepartmentList]);

  return (
    <AppLayout>
      <HomeContainer>
        {typeof sectionListData !== "undefined" ? (
          <SectionList
            sections={sectionListData}
            keyExtractor={(item, index) => item.title + index}
            onEndReached={fetchMoreNoticeData}
            onEndReachedThreshold={0.1}
            extraData={noticeCreatedDate}
            refreshing={isRefreshing}
            onRefresh={fetchInitialNoticeData}
            scrollIndicatorInsets={{ right: 1 }}
            renderSectionHeader={({ section: { data } }) => {
              if (data.length !== 0) {
                return (
                  <NoticeCardHeader
                    displayedDay={getDescriptiveDateDifference(data[0].date)}
                  />
                );
              } else {
                return null;
              }
            }}
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
            ListFooterComponent={
              <View style={LoadingStyles.listFooter}>
                <Button
                  loading={true}
                  mode="outlined"
                  onPress={fetchMoreNoticeData}
                >
                  더 불러오기
                </Button>
              </View>
            }
          />
        ) : (
          <View style={LoadingStyles.container}>
            <ActivityIndicator animating={true} size="large" />
          </View>
        )}
      </HomeContainer>
    </AppLayout>
  );
}

const LoadingStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  listFooter: {
    marginTop: 16,
    marginBottom: 32,
    alignSelf: "center",
  },
});
