import * as React from "react";
import AppLayout from "modules/AppLayout";
import { useSelector } from "react-redux";
import { getSavedArticle } from "components/Article/redux/selectors";
import { useNavigation } from "@react-navigation/native";
import { FlatList, Text } from "react-native";
import { HomeContainer } from "components/Home/index";
import NoticeCard from "components/Home/NoticeCard";

export default function SavedArticles() {
  const navigation = useNavigation();
  const savedNoticeArticle = useSelector(getSavedArticle);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "저장된 공지사항",
    });
  });

  return (
    <AppLayout>
      <HomeContainer>
        {savedNoticeArticle !== null ? (
          <FlatList
            data={savedNoticeArticle}
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
          <Text>저장된 공지사항이 없음</Text>
        )}
      </HomeContainer>
    </AppLayout>
  );
}
