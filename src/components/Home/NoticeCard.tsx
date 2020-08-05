import React from "react";
import styled from "styled-components/native";
import { useDispatch } from "react-redux";
import Ripple from "react-native-material-ripple";
import { Divider } from "react-native-elements";
// @ts-ignore
import TextAvatar from "react-native-text-avatar";
import { useNavigation } from "@react-navigation/native";
import theme from "theme";
import { setArticleId } from "components/Article/redux/actions";

export type NoticeCardItem = {
  deptName: string;
  authorDept: string;
  title: string;
  date: string;
  author: string;
  listId: string;
};

const NoticeCardContainer = styled.View`
  padding: 0 16px;
`;

export const NoticeCardHeaderContainer = styled.View`
  margin: 16px 16px 0 16px;
`;

const NoticeCardHeaderText = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const NoticeCardItemTitleContainer = styled.View`
  margin-top: 18px;
  flex-direction: row;
  margin-bottom: 8px;
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
`;

const NoticeCardItemSubtitleText = styled.Text`
  font-size: 12px;
  color: ${theme.colors.darkGrey};
`;

export const NoticeCardHeader = ({
  displayedDay,
}: {
  displayedDay: string;
}) => {
  return (
    <NoticeCardHeaderContainer>
      <NoticeCardHeaderText>{displayedDay}</NoticeCardHeaderText>
    </NoticeCardHeaderContainer>
  );
};

const NoticeCardItemTitle = ({
  authorDept,
  title,
}: {
  authorDept: string;
  title: string;
}) => {
  return (
    <NoticeCardItemTitleContainer>
      <TextAvatar
        backgroundColor={theme.colors.department.general}
        textColor={theme.colors.white}
        size={34}
        type={"circle"}
      >
        {`${authorDept}`}
      </TextAvatar>
      <NoticeCardItemTitleText>{title}</NoticeCardItemTitleText>
    </NoticeCardItemTitleContainer>
  );
};

const NoticeCardItemSubtitle = ({
  date,
  author,
  authorDept,
}: {
  date: string;
  author: string;
  authorDept: string;
}) => {
  return (
    <NoticeCardItemSubtitleContainer>
      <NoticeCardItemSubtitleText>
        {`${author} / ${authorDept}`}
      </NoticeCardItemSubtitleText>
      <NoticeCardItemSubtitleText>{date}</NoticeCardItemSubtitleText>
    </NoticeCardItemSubtitleContainer>
  );
};

export default function NoticeCard({
  deptName,
  authorDept,
  title,
  date,
  author,
  listId,
}: NoticeCardItem) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleNoticeCardItemClick = React.useCallback(() => {
    navigation.navigate("Article");
    dispatch(setArticleId({ deptName: deptName, listId: listId }));
  }, []);

  return (
    <Ripple onPress={handleNoticeCardItemClick}>
      <NoticeCardContainer>
        <NoticeCardItemTitle authorDept={authorDept} title={title} />
        <NoticeCardItemSubtitle
          date={date}
          author={author}
          authorDept={authorDept}
        />
        <Divider />
      </NoticeCardContainer>
    </Ripple>
  );
}
