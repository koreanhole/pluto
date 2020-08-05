import * as React from "react";
import AppLayout from "modules/AppLayout";
import { ScrollView } from "react-native";
import styled from "styled-components/native";
import HTML from "react-native-render-html";
import HeaderRightButton from "./HeaderRightButton";
import theme from "theme";
import { useSelector } from "react-redux";
import { getArticleId } from "./redux/selectors";
import { noticeFirestore } from "firebase/firestore";
import { NoticeArticle } from "./redux/types";
import { Text } from "react-native-elements";

const ArticleContainer = styled.View`
  margin: 16px;
`;

const ArticleAdditionalInformation = styled.Text`
  color: ${theme.colors.darkGrey};
  margin-bottom: 8px;
`;

export default function Article() {
  const articleId = useSelector(getArticleId);

  const [noticeData, setNoticeData] = React.useState<NoticeArticle>();

  const fetchNoticeData = async () => {
    try {
      let noticeRef = noticeFirestore
        .collection(articleId.deptName)
        .doc(articleId.listId);

      noticeRef.get().then((document) => {
        if (document.exists) {
          const fetchedData = document.data();
          if (typeof fetchedData !== "undefined") {
            const fetchedNoticeData: NoticeArticle = {
              attachmentLink: fetchedData.attachmentLink,
              authorDept: fetchedData.authorDept,
              authorName: fetchedData.authorName,
              contentHtml: fetchedData.contentHtml,
              createdDate: fetchedData.createdDate,
              title: fetchedData.title,
              contentString: fetchedData.contentString,
              listId: fetchedData.listId,
              deptName: fetchedData.deptName,
              deptCode: fetchedData.deptCode,
            };
            setNoticeData(fetchedNoticeData);
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchNoticeData();
  }, [articleId]);
  return (
    <AppLayout
      title={noticeData?.title}
      mode="BACK"
      rightComponent={<HeaderRightButton />}
    >
      <ScrollView>
        {typeof noticeData !== "undefined" ? (
          <ArticleContainer>
            <ArticleAdditionalInformation>
              {noticeData.createdDate}
            </ArticleAdditionalInformation>
            <ArticleAdditionalInformation>
              {`${noticeData.authorName} / ${noticeData.authorDept} / ${noticeData.deptName}`}
            </ArticleAdditionalInformation>
            {typeof noticeData.contentHtml !== "undefined" ? (
              <HTML html={noticeData.contentHtml} />
            ) : (
              <Text>데이터가 존재하지 않습니다.</Text>
            )}
          </ArticleContainer>
        ) : (
          <Text>데이터가 존재하지 않습니다.</Text>
        )}
      </ScrollView>
    </AppLayout>
  );
}
