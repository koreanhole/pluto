import * as React from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { View, Alert, StyleSheet } from "react-native";
import { Card, Divider, IconButton } from "react-native-paper";
import Ripple from "react-native-material-ripple";
import { deleteSavedNotice } from "components/Article/redux/actions";
import { NoticeArticle } from "components/Article/redux/types";

export default function PlainArticleListItem({
  data,
  deleteEnabled,
}: {
  data: NoticeArticle;
  deleteEnabled: boolean;
}) {
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
        text: "삭제",
        onPress: () => dispatch(deleteSavedNotice(data)),
        style: "destructive",
      },
      {
        text: "취소",
        style: "cancel",
      },
    ]);
  };

  return (
    <>
      <View style={PlainArticleListItemStyles.container}>
        <Ripple onPress={handleFlatListItemClick} style={{ flexGrow: 1 }}>
          <Card.Title
            title={data.title}
            titleStyle={{ fontSize: 15 }}
            subtitle={`${data.authorName} / ${data.deptName} / ${data.createdDate}`}
          />
        </Ripple>
        {deleteEnabled && (
          <IconButton icon="delete-outline" onPress={handleClickDelete} />
        )}
      </View>
      <Divider />
    </>
  );
}

const PlainArticleListItemStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});
