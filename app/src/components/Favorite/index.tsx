import * as React from "react";
import AppLayout from "modules/AppLayout";
import { useSelector, useDispatch } from "react-redux";
import { getSavedArticle } from "components/Article/redux/selectors";
import { useNavigation } from "@react-navigation/native";
import { FlatList, StyleSheet, Text, View, Alert } from "react-native";
import { HomeContainer } from "components/Home/index";
import { Card, Divider, IconButton } from "react-native-paper";
import Ripple from "react-native-material-ripple";
import { deleteSavedNotice } from "components/Article/redux/actions";

import { NoticeArticle } from "components/Article/redux/types";

const FlatListItem = ({ data }: { data: NoticeArticle }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleFlatListItemClick = React.useCallback(() => {
    navigation.navigate("Article", {
      deptCode: data.deptCode,
      listId: data.listId,
    });
  }, []);

  const handleClickDelete = () => {
    Alert.alert("저장된 공지사항에서 삭제하시겠습니까?", data.title, [
      {
        text: "확인",
        onPress: () => dispatch(deleteSavedNotice(data)),
        style: "default",
      },
      {
        text: "취소",
        style: "cancel",
      },
    ]);
  };

  return (
    <>
      <View style={FlatListItemStyles.container}>
        <Ripple onPress={handleFlatListItemClick} style={{ flexGrow: 1 }}>
          <Card.Title
            title={data.title}
            titleStyle={{ fontSize: 15 }}
            subtitle={`${data.authorName} / ${data.deptName} / ${data.createdDate}`}
          />
        </Ripple>
        <IconButton icon="delete-outline" onPress={handleClickDelete} />
      </View>
      <Divider />
    </>
  );
};

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
            renderItem={(data) => <FlatListItem data={data.item} />}
          />
        ) : (
          <Text>저장된 공지사항이 없음</Text>
        )}
      </HomeContainer>
    </AppLayout>
  );
}

const FlatListItemStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});
