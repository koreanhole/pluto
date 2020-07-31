import * as React from "react";
import AppLayout from "modules/AppLayout";
import NoticeCard, { NoticeCardHeader } from "./NoticeCard";
import { View, SectionList } from "react-native";
import styled from "styled-components/native";
import HeaderRightButton from "./HeaderRightButton";

type NoticeCardItem = {
  type: string;
  title: string;
  date: string;
  author: string;
};

// dummy data
const DATA: { created_day: string; data: NoticeCardItem[] }[] = [
  {
    created_day: "오늘",
    data: [
      {
        type: "전기전자컴퓨터공학부",
        title: "교내 체육시설 개방안내",
        date: "1분전",
        author: "체육관",
      },
      {
        type: "일반공지",
        title: "교내 체육시설 개방안내",
        date: "2020-07-31",
        author: "체육관",
      },
      {
        type: "일반공지",
        title: "교내 체육시설 개방안내",
        date: "2020-07-31",
        author: "체육관",
      },
      {
        type: "일반공지",
        title: "교내 체육시설 개방안내",
        date: "2020-07-31",
        author: "체육관",
      },
      {
        type: "일반공지",
        title: "교내 체육시설 개방안내",
        date: "2020-07-31",
        author: "체육관",
      },
      {
        type: "일반공지",
        title: "교내 체육시설 개방안내",
        date: "2020-07-31",
        author: "체육관",
      },
      {
        type: "일반공지",
        title: "교내 체육시설 개방안내",
        date: "2020-07-31",
        author: "체육관",
      },
      {
        type: "일반공지",
        title: "교내 체육시설 개방안내",
        date: "2020-07-31",
        author: "체육관",
      },
      {
        type: "일반공지",
        title: "교내 체육시설 개방안내",
        date: "2020-07-31",
        author: "체육관",
      },
    ],
  },
  {
    created_day: "7월 31일",
    data: [
      {
        type: "일반공지",
        title: "교내 체육시설 개방안내",
        date: "2020-07-31",
        author: "체육관",
      },
      {
        type: "일반공지",
        title: "교내 체육시설 개방안내",
        date: "2020-07-31",
        author: "체육관",
      },
      {
        type: "일반공지",
        title: "교내 체육시설 개방안내",
        date: "2020-07-31",
        author: "체육관",
      },
      {
        type: "일반공지",
        title: "교내 체육시설 개방안내",
        date: "2020-07-31",
        author: "체육관",
      },
      {
        type: "일반공지",
        title: "교내 체육시설 개방안내",
        date: "2020-07-31",
        author: "체육관",
      },
      {
        type: "일반공지",
        title: "교내 체육시설 개방안내",
        date: "2020-07-31",
        author: "체육관",
      },
      {
        type: "일반공지",
        title: "교내 체육시설 개방안내",
        date: "2020-07-31",
        author: "체육관",
      },
      {
        type: "일반공지",
        title: "교내 체육시설 개방안내",
        date: "2020-07-31",
        author: "체육관",
      },
      {
        type: "일반공지",
        title: "교내 체육시설 개방안내",
        date: "2020-07-31",
        author: "체육관",
      },
    ],
  },
];

const HomeContainer = styled(View)`
  flex: 1;
`;

export default function Home() {
  return (
    <AppLayout
      title="UOS공지사항 뷰어"
      mode="NONE"
      rightComponent={<HeaderRightButton />}
    >
      <HomeContainer>
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item.title + index}
          stickySectionHeadersEnabled={false}
          renderSectionHeader={({ section: { created_day } }) => (
            <NoticeCardHeader created_day={created_day} />
          )}
          renderItem={(data) => (
            <NoticeCard
              type={data.item.type}
              title={data.item.title}
              date={data.item.date}
              author={data.item.author}
            />
          )}
        />
      </HomeContainer>
    </AppLayout>
  );
}
