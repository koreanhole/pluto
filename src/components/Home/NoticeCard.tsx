import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import Ripple from "react-native-material-ripple";
import { Divider } from "react-native-elements";
// @ts-ignore
import TextAvatar from "react-native-text-avatar";

const NoticeCardContainer = styled(View)`
  padding: 16px;
`;

const NoticeCardHeaderText = styled.Text`
  font-size: 23px;
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
  color: #828282;
`;

const NoticeCardItemTitle = () => {
  return (
    <NoticeCardItemTitleContainer>
      <TextAvatar
        backgroundColor={"#0a4e9b"}
        textColor={"#fff"}
        size={34}
        type={"circle"}
      >
        일반
      </TextAvatar>
      <NoticeCardItemTitleText>제목입니다.</NoticeCardItemTitleText>
    </NoticeCardItemTitleContainer>
  );
};

const NoticeCardItemSubtitle = () => {
  return (
    <NoticeCardItemSubtitleContainer>
      <NoticeCardItemSubtitleText>날짜입니다.</NoticeCardItemSubtitleText>
      <NoticeCardItemSubtitleText>
        작성자입니다. / 분류입니다.
      </NoticeCardItemSubtitleText>
    </NoticeCardItemSubtitleContainer>
  );
};

export default function NoticeCard() {
  return (
    <NoticeCardContainer>
      <NoticeCardHeaderText>7월 31일</NoticeCardHeaderText>
      <Ripple>
        <NoticeCardItemTitle />
        <NoticeCardItemSubtitle />
        <Divider />
      </Ripple>
    </NoticeCardContainer>
  );
}
