import React from "react";
import styled from "styled-components/native";
import Ripple from "react-native-material-ripple";
import { Divider } from "react-native-elements";
// @ts-ignore
import TextAvatar from "react-native-text-avatar";
import { useNavigation } from "@react-navigation/native";
import theme from "theme";

export type NoticeCardProps = {
  type: string;
  title: string;
  date: string;
  author: string;
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
  margin-left: 8px;
  font-size: 15px;
  align-self: center;
`;

const NoticeCardItemSubtitleText = styled.Text`
  font-size: 12px;
  color: ${theme.colors.darkGrey};
`;

export const NoticeCardHeader = ({ created_day }: { created_day: string }) => {
  return (
    <NoticeCardHeaderContainer>
      <NoticeCardHeaderText>{created_day}</NoticeCardHeaderText>
    </NoticeCardHeaderContainer>
  );
};

const NoticeCardItemTitle = ({
  type,
  title,
}: {
  type: string;
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
        {`${type}`}
      </TextAvatar>
      <NoticeCardItemTitleText>{title}</NoticeCardItemTitleText>
    </NoticeCardItemTitleContainer>
  );
};

const NoticeCardItemSubtitle = ({
  date,
  author,
  type,
}: {
  date: string;
  author: string;
  type: string;
}) => {
  return (
    <NoticeCardItemSubtitleContainer>
      <NoticeCardItemSubtitleText>
        {`${author} / ${type}`}
      </NoticeCardItemSubtitleText>
      <NoticeCardItemSubtitleText>{date}</NoticeCardItemSubtitleText>
    </NoticeCardItemSubtitleContainer>
  );
};

export default function NoticeCard({
  type,
  title,
  date,
  author,
}: NoticeCardProps) {
  const navigation = useNavigation();

  const handleNoticeCardItemClick = React.useCallback(() => {
    navigation.navigate("Article");
  }, []);

  return (
    <Ripple onPress={handleNoticeCardItemClick}>
      <NoticeCardContainer>
        <NoticeCardItemTitle type={type} title={title} />
        <NoticeCardItemSubtitle date={date} author={author} type={type} />
        <Divider />
      </NoticeCardContainer>
    </Ripple>
  );
}
