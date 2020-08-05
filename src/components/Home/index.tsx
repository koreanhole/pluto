import * as React from "react";
import { useSelector } from "react-redux";
import AppLayout from "modules/AppLayout";
import NoticeCard, { NoticeCardHeader, NoticeCardItem } from "./NoticeCard";
import { View, SectionList } from "react-native";
import styled from "styled-components/native";
import HeaderRightButton from "./HeaderRightButton";
import { getFavoriteDepartmentList } from "../Department/redux/selectors";
import { noticeFirestore } from "firebase/firestore";

const HomeContainer = styled(View)`
  flex: 1;
`;

export default function Home() {
  const favoriteDepartmentList = useSelector(getFavoriteDepartmentList);

  const [noticeData, setNoticeData] = React.useState<NoticeCardItem[]>();

  const retrieveData = async () => {
    try {
      let noticeQuery = noticeFirestore
        .collection("FA1")
        .where("createdDate", "==", "2020-07-20");
      let noticeSnapshot = await noticeQuery.get();
      let fetchedNoticeData = noticeSnapshot.docs.map((document) => {
        const fetchedData = document.data();
        return {
          type: fetchedData.type,
          authorDept: fetchedData.authorDept,
          title: fetchedData.title,
          date: fetchedData.createdDate,
          author: fetchedData.authorName,
          listId: fetchedData.listId,
        };
      });
      setNoticeData(fetchedNoticeData);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    retrieveData();
    console.log(noticeData);
  }, [favoriteDepartmentList]);
  return (
    <AppLayout
      title="UOS공지사항 뷰어"
      mode="NONE"
      rightComponent={<HeaderRightButton />}
    >
      <HomeContainer>
        {noticeData && (
          <SectionList
            sections={[{ created_day: "오늘", data: noticeData }]}
            keyExtractor={(item, index) => item.title + index}
            stickySectionHeadersEnabled={false}
            renderSectionHeader={({ section: { created_day } }) => (
              <NoticeCardHeader created_day={created_day} />
            )}
            renderItem={(data) => (
              <NoticeCard
                type={data.item.type}
                authorDept={data.item.authorDept}
                title={data.item.title}
                date={data.item.date}
                author={data.item.author}
                listId={data.item.listId}
              />
            )}
          />
        )}
      </HomeContainer>
    </AppLayout>
  );
}
