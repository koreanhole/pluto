import * as React from "react";
import { FlatList, Alert } from "react-native";
import { useDispatch } from "react-redux";
import AppLayout from "modules/AppLayout";
import NoticeCard from "components/Home/NoticeCard";
import { NoticeArticle } from "components/Article/redux/types";
import { noticeFirestore } from "util/firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import _ from "underscore";
import { registerForPushNotificationsAsync } from "util/pushNotification";
import { setExpoPushToken } from "components/Department/redux/actions";
import * as Notifications from "expo-notifications";
import LoadingIndicator from "modules/LoadingIndicator";
import { HomeContainer } from "components/Home/index";

type ArticleListProps = {
  key: string;
  name: string;
  params: {
    deptName: string;
  };
};

export default function ArticleList({ route }: { route: ArticleListProps }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [flatListData, setFlatListData] = React.useState<NoticeArticle[]>();

  const fetchInitialNotice = () => {
    const query = noticeFirestore
      .where("deptName", "==", route.params.deptName)
      .orderBy("createdDate", "desc")
      .limit(50);
    query
      .get()
      .then((documentSnapshots) => {
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
      })
      .catch(() => {
        Alert.alert(
          "공지사항을 불러올 수 없습니다.",
          "잠시 후 다시 시도해주세요ㅠㅠ",
          [
            {
              text: "확인",
            },
          ]
        );
      });
  };

  React.useEffect(fetchInitialNotice, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: route.params.deptName,
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
