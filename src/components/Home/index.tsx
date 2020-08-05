import * as React from "react";
import { useSelector } from "react-redux";
import AppLayout from "modules/AppLayout";
import NoticeCard, { NoticeCardHeader, NoticeCardItem } from "./NoticeCard";
import { View, SectionList } from "react-native";
import styled from "styled-components/native";
import HeaderRightButton from "./HeaderRightButton";
import { getFavoriteDepartmentList } from "../Department/redux/selectors";
import { noticeFirestore } from "firebase/firestore";
import { getDescriptiveDateDifference } from "./util";

const HomeContainer = styled(View)`
  flex: 1;
`;

export default function Home() {
  const favoriteDepartmentList = useSelector(getFavoriteDepartmentList);

  const [noticeData, setNoticeData] = React.useState<NoticeCardItem[]>();

  const fetchNoticeData = async (favoriteDepartment: string) => {
    try {
      let noticeQuery = noticeFirestore
        .collection(favoriteDepartment)
        .where("createdDate", "==", "2020-07-20");
      let noticeSnapshot = await noticeQuery.get();
      let fetchedNoticeData: NoticeCardItem[] = noticeSnapshot.docs.map(
        (document) => {
          const fetchedData = document.data();
          return {
            deptName: fetchedData.deptName,
            authorDept: fetchedData.authorDept,
            title: fetchedData.title,
            date: fetchedData.createdDate,
            author: fetchedData.authorName,
            listId: fetchedData.listId,
          };
        }
      );
      setNoticeData(fetchedNoticeData);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (favoriteDepartmentList !== null) {
      favoriteDepartmentList.forEach((favoriteDepartment) =>
        fetchNoticeData(favoriteDepartment)
      );
    }
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
            sections={[{ data: noticeData }]}
            keyExtractor={(item, index) => item.title + index}
            stickySectionHeadersEnabled={false}
            renderSectionHeader={({ section: { data } }) => (
              <NoticeCardHeader
                displayedDay={getDescriptiveDateDifference(data[0].date)}
              />
            )}
            renderItem={(data) => (
              <NoticeCard
                deptName={data.item.deptName}
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
