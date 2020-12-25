import * as React from "react";
import AppLayout from "modules/AppLayout";
import { useSelector } from "react-redux";
import { getSavedArticle } from "components/Article/redux/selectors";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native";
import { HomeContainer } from "components/Home/index";
import HeaderRightButton from "./HeaderRightButton";
import PlainArticleListItem from "modules/PlainArticleListItem";

export default function SavedArticles() {
  const navigation = useNavigation();
  const savedNoticeArticle = useSelector(getSavedArticle);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "저장된 공지사항",
      headerRight: () => savedNoticeArticle !== null && <HeaderRightButton />,
    });
  });

  return (
    <>
      {savedNoticeArticle !== null && savedNoticeArticle.length !== 0 ? (
        <AppLayout>
          <HomeContainer>
            <FlatList
              data={savedNoticeArticle}
              keyExtractor={(item, index) => item.title + index}
              renderItem={(data) => (
                <PlainArticleListItem data={data.item} deleteEnabled={true} />
              )}
            />
          </HomeContainer>
        </AppLayout>
      ) : (
        <AppLayout
          noDataText={`저장된 공지사항이 없습니다.\n게시글에서 ♥︎를 눌러서 저장해주세요.`}
        />
      )}
    </>
  );
}
