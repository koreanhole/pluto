import * as React from "react";
import { useSelector } from "react-redux";
import AppLayout from "modules/AppLayout";
import NoticeCard, { NoticeCardItem } from "./NoticeCard";
import { View, FlatList } from "react-native";
import styled from "styled-components/native";
import HeaderRightButton from "./HeaderRightButton";
import { getFavoriteDepartmentList } from "../Department/redux/selectors";
import { noticeFirestore } from "firebase/firestore";
import { subDays } from "date-fns";

const HomeContainer = styled(View)`
  flex: 1;
`;

export default function Home() {
  const favoriteDepartmentList = useSelector(getFavoriteDepartmentList);

  const [isRefreshing, setIsRefreshing] = React.useState(true);
  const [flatListData, setFlatListData] = React.useState<NoticeCardItem[]>();
  const [noticeCreatedDate, setNoticeCreatedDate] = React.useState<Date>(
    new Date()
  );

  const fetchNoticeData = async () => {
    try {
      setIsRefreshing(true);
      const fiveDaysBefore = subDays(noticeCreatedDate, 5);
      let noticeQuery = noticeFirestore
        .where("deptName", "in", favoriteDepartmentList)
        .where("createdDateTimestamp", "<", noticeCreatedDate)
        .where("createdDateTimestamp", ">", fiveDaysBefore)
        .orderBy("createdDateTimestamp", "desc");
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
      if (typeof flatListData !== "undefined") {
        setFlatListData(flatListData.concat(fetchedNoticeData));
      } else {
        setFlatListData(fetchedNoticeData);
      }
      setNoticeCreatedDate(fiveDaysBefore);
      setIsRefreshing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNoticeDataRefresh = React.useCallback(() => {
    setNoticeCreatedDate(new Date());
    fetchNoticeData();
  }, []);

  React.useEffect(() => {
    fetchNoticeData();
  }, [favoriteDepartmentList]);
  return (
    <AppLayout
      title="UOS공지사항 뷰어"
      mode="NONE"
      rightComponent={<HeaderRightButton />}
    >
      <HomeContainer>
        {flatListData && (
          <FlatList
            data={flatListData}
            keyExtractor={(item, index) => item.title + index}
            onEndReached={fetchNoticeData}
            scrollIndicatorInsets={{ right: 1 }}
            refreshing={isRefreshing}
            onRefresh={handleNoticeDataRefresh}
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
