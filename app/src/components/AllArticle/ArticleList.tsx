import * as React from "react";
import { FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "modules/AppLayout";
import NoticeCard from "components/Home/NoticeCard";
import { useNavigation } from "@react-navigation/native";
import LoadingIndicator from "modules/LoadingIndicator";
import { fetchInitialNoticeListAsync } from "components/Article/redux/actions";
import { getAllArticleInitialNotice, getNoticeFetchState } from "components/Article/redux/selectors";
import { View } from "react-native";

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
      fetchInitialNoticeListAsync.request({
        departmentList: [deptName],
        pageType: "ALL_ARTICLE",
      }),
    );
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: route.params.deptName,
    });
  }, [navigation]);

  return (
    <AppLayout>
      <View style={ArticleListStyles.container}>
        {noticeFetchState == "SUCCESS" ? (
          <FlatList
            data={noticeData}
            keyExtractor={(item) => `${item.deptCode}${item.listId}`}
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
      </View>
    </AppLayout>
  );
}

const ArticleListStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
