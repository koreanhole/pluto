import * as React from "react";
import { FlatList, StyleSheet } from "react-native";
import AppLayout from "modules/AppLayout";
import NoticeCard from "components/Home/NoticeCard";
import { useNavigation } from "@react-navigation/native";
import LoadingIndicator from "modules/LoadingIndicator";
import { View } from "react-native";
import { useQuery } from "@apollo/client";
import { NOTICE_BY_DEPARTMENT_NAME } from "./queries";
import { NoticeArticleDataList } from "../Article/redux/types";

type ArticleListProps = {
  key: string;
  name: string;
  params: {
    deptName: string;
  };
};

export default function ArticleList({ route }: { route: ArticleListProps }) {
  const navigation = useNavigation();

  const deptName = route.params.deptName;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: route.params.deptName,
    });
  }, [navigation]);

  const { loading, data } = useQuery<NoticeArticleDataList>(NOTICE_BY_DEPARTMENT_NAME, {
    variables: {
      deptName,
      offset: 0,
    },
  });

  if (loading)
    return (
      <AppLayout>
        <View style={ArticleListStyles.container}>
          <LoadingIndicator />
        </View>
      </AppLayout>
    );

  return (
    <AppLayout>
      <View style={ArticleListStyles.container}>
        {typeof data !== "undefined" && (
          <FlatList
            data={data.getNoticeByDepartmentName}
            keyExtractor={(item) => item.id}
            renderItem={(data) => (
              <NoticeCard
                id={data.item.id}
                department={data.item.department}
                authorDept={data.item.authorDept}
                title={data.item.title}
                createdDatetime={data.item.createdDatetime}
                authorName={data.item.authorName}
                listId={data.item.listId}
              />
            )}
          />
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
