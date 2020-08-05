import * as React from "react";
import { useSelector } from "react-redux";
import AppLayout from "modules/AppLayout";
import NoticeCard, { NoticeCardHeader, NoticeCardItem } from "./NoticeCard";
import { View, SectionList } from "react-native";
import styled from "styled-components/native";
import HeaderRightButton from "./HeaderRightButton";
import { getFavoriteDepartmentList } from "../Department/redux/selectors";
import { noticeFirestore } from "firebase/firestore";
import { getDescriptiveDateDifference, getFormattedDateString } from "./util";
import { subDays } from "date-fns";

type SectionDataList = {
  data: NoticeCardItem[];
};

const HomeContainer = styled(View)`
  flex: 1;
`;

export default function Home() {
  const favoriteDepartmentList = useSelector(getFavoriteDepartmentList);

  const [sectionData, setSectionData] = React.useState<SectionDataList[]>();
  const [noticeCreatedDate, setNoticeCreatedDate] = React.useState<Date>(
    new Date()
  );

  const fetchNoticeData = async (favoriteDepartment: string, date: string) => {
    try {
      let noticeQuery = noticeFirestore
        .collection(favoriteDepartment)
        .where("createdDate", "==", date);
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
      if (typeof sectionData !== "undefined") {
        setSectionData([...sectionData, { data: fetchedNoticeData }]);
      } else {
        setSectionData([{ data: fetchedNoticeData }]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMoreNoticeData = () => {
    if (favoriteDepartmentList !== null) {
      favoriteDepartmentList.forEach((favoriteDepartment) =>
        fetchNoticeData(
          favoriteDepartment,
          getFormattedDateString(noticeCreatedDate)
        )
      );
    }
    setNoticeCreatedDate(subDays(noticeCreatedDate, 1));
  };

  React.useEffect(() => {
    if (favoriteDepartmentList !== null) {
      favoriteDepartmentList.forEach((favoriteDepartment) =>
        fetchNoticeData(
          favoriteDepartment,
          getFormattedDateString(noticeCreatedDate)
        )
      );
    }
    setNoticeCreatedDate(subDays(noticeCreatedDate, 1));
    console.log(sectionData);
  }, []);
  return (
    <AppLayout
      title="UOS공지사항 뷰어"
      mode="NONE"
      rightComponent={<HeaderRightButton />}
    >
      <HomeContainer>
        {sectionData && (
          <SectionList
            sections={sectionData}
            keyExtractor={(item, index) => item.title + index}
            stickySectionHeadersEnabled={false}
            onEndReached={fetchMoreNoticeData}
            renderSectionHeader={({ section: { data } }) => {
              if (data.length !== 0) {
                return (
                  <NoticeCardHeader
                    displayedDay={getDescriptiveDateDifference(data[0].date)}
                  />
                );
              } else {
                return null;
              }
            }}
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
