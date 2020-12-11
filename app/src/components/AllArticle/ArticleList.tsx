import * as React from "react";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "modules/AppLayout";
import NoticeCard from "components/Home/NoticeCard";
import { useNavigation } from "@react-navigation/native";
import _ from "underscore";
import { registerForPushNotificationsAsync } from "util/pushNotification";
import { setExpoPushToken } from "components/Department/redux/actions";
import * as Notifications from "expo-notifications";
import LoadingIndicator from "modules/LoadingIndicator";
import { HomeContainer } from "components/Home/index";
import { fetchInitialNoticeAsync } from "components/Home/redux/actions";
import {
  getAllArticleInitialNotice,
  getNoticeFetchState,
} from "components/Home/redux/selectors";

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
  const noticeData = useSelector(getAllArticleInitialNotice);
  const noticeFetchState = useSelector(getNoticeFetchState);

  const deptName = route.params.deptName;

  React.useEffect(() => {
    dispatch(
      fetchInitialNoticeAsync.request({
        departmentList: [deptName],
        pageType: "ALL_ARTICLE",
      })
    );
  }, []);

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
        {noticeFetchState == "SUCCESS" ? (
          <FlatList
            data={noticeData}
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
