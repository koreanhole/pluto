import React from "react";
import styled from "styled-components/native";
import { Text, View, StyleSheet } from "react-native";
import Ripple from "react-native-material-ripple";
import Divider from "modules/Divider";
// @ts-ignore
import TextAvatar from "react-native-text-avatar";
import { useNavigation } from "@react-navigation/native";
import theme from "theme";
import randomColor from "randomcolor";
import { getDescriptiveDateDifference } from "./util";
import { MaterialIcons } from "@expo/vector-icons";
import { NoticeArticle } from "components/Article/redux/types";

const NoticeCardContainer = styled.View`
  padding: 0 16px;
`;

const NoticeCardItemTitleContainer = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
  align-items: center;
`;

const NoticeCardItemSubtitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const NoticeCardItemTitleText = styled.Text`
  padding-left: 8px;
  font-size: 15px;
  align-self: center;
  flex: 1;
`;

const NoticeCardItemSubtitleText = styled.Text`
  font-size: 12px;
  color: ${theme.colors.darkGrey};
`;

export const NoticeCardHeader = ({
  createdDate,
  favoriteCount,
}: {
  createdDate: string;
  favoriteCount?: number;
}) => {
  return (
    <View style={NoticeCardStyle.header}>
      <Text
        style={NoticeCardStyle.headerText}
      >{`#${getDescriptiveDateDifference(createdDate)}`}</Text>
      {typeof favoriteCount !== "undefined" && favoriteCount > 0 && (
        <View style={NoticeCardStyle.favoriteContainer}>
          <MaterialIcons name="favorite-border" color={theme.colors.darkGrey} />
          <Text style={NoticeCardStyle.favoriteCounterText}>
            {favoriteCount}
          </Text>
        </View>
      )}
    </View>
  );
};

const NoticeCardItemTitle = ({
  deptName,
  title,
}: {
  deptName: string;
  title: string;
}) => {
  return (
    <NoticeCardItemTitleContainer>
      <TextAvatar
        backgroundColor={randomColor({
          seed: deptName,
          luminosity: "bright",
          alpha: 1,
        })}
        textColor={theme.colors.white}
        size={34}
        type={"circle"}
      >
        {`${deptName}`}
      </TextAvatar>
      <NoticeCardItemTitleText>{title}</NoticeCardItemTitleText>
    </NoticeCardItemTitleContainer>
  );
};

const NoticeCardItemSubtitle = ({
  createdDate,
  authorName,
  authorDept,
}: {
  createdDate: string;
  authorName: string;
  authorDept: string;
}) => {
  return (
    <NoticeCardItemSubtitleContainer>
      <NoticeCardItemSubtitleText>
        {`${authorName}`}
        {authorDept && ` / ${authorDept}`}
      </NoticeCardItemSubtitleText>
      <NoticeCardItemSubtitleText>{`${createdDate}`}</NoticeCardItemSubtitleText>
    </NoticeCardItemSubtitleContainer>
  );
};

export default function NoticeCard(props: NoticeArticle) {
  const {
    deptCode,
    deptName,
    authorDept,
    title,
    createdDate,
    authorName,
    listId,
    favoriteCount,
  } = props;
  const navigation = useNavigation();

  const handleNoticeCardItemClick = React.useCallback(() => {
    navigation.navigate("Article", { deptCode: deptCode, listId: listId });
  }, []);

  return (
    <Ripple onPress={handleNoticeCardItemClick}>
      <NoticeCardContainer>
        <NoticeCardHeader
          createdDate={createdDate}
          favoriteCount={favoriteCount}
        />
        <NoticeCardItemTitle deptName={deptName} title={title} />
        <NoticeCardItemSubtitle
          createdDate={createdDate}
          authorName={authorName}
          authorDept={authorDept}
        />
        <Divider />
      </NoticeCardContainer>
    </Ripple>
  );
}

const NoticeCardStyle = StyleSheet.create({
  header: {
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    color: theme.colors.darkGrey,
    fontSize: 12,
  },
  favoriteContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  favoriteCounterText: {
    marginLeft: 2,
    color: theme.colors.darkGrey,
    fontSize: 12,
  },
});
