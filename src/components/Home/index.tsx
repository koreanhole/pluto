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
import { useNavigation } from "@react-navigation/native";

const HomeContainer = styled(View)`
  flex: 1;
`;

export default function Home() {
  const navigation = useNavigation();

  const favoriteDepartmentList = useSelector(getFavoriteDepartmentList);

  const [flatListData, setFlatListData] = React.useState<NoticeCardItem[]>();
  const [noticeCreatedDate, setNoticeCreatedDate] = React.useState<Date>(
    new Date()
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "UOS 공지사항 🌋",
      headerRight: () => <HeaderRightButton />,
    });
  });

  const fetchNoticeData = async () => {
    try {
      const fiveDaysBefore = subDays(noticeCreatedDate, 5);
      let noticeQuery = noticeFirestore
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
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchNoticeData();
  }, []);
  return (
    <AppLayout>
      <HomeContainer>
        {flatListData && (
          <FlatList
            data={flatListData.filter((item) => {
              return favoriteDepartmentList.includes(item.deptName) ?? item;
            })}
            keyExtractor={(item, index) => item.title + index}
            onEndReached={fetchNoticeData}
            extraData={flatListData}
            scrollIndicatorInsets={{ right: 1 }}
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
