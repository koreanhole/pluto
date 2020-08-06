import * as React from "react";
import AppLayout from "modules/AppLayout";
import { ScrollView } from "react-native";
import styled from "styled-components/native";
import HeaderRightButton from "./HeaderRightButton";
import theme from "theme";
import { useSelector } from "react-redux";
import { getArticleId } from "./redux/selectors";
import { noticeFirestore } from "firebase/firestore";
import { NoticeArticle } from "./redux/types";
import { Dimensions } from "react-native";
import AutoHeightWebView from "react-native-autoheight-webview";

const ArticleContainer = styled.View`
  margin: 16px;
`;

const ArticleTitle = styled.Text`
  color: ${theme.colors.black};
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const ArticleAdditionalInformation = styled.Text`
  color: ${theme.colors.darkGrey};
  margin-bottom: 16px;
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
              url: fetchedData.url,
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
  if (typeof noticeData !== "undefined") {
    return (
      <AppLayout
        title="게시글"
        mode="BACK"
        rightComponent={<HeaderRightButton url={noticeData.url} />}
      >
        <ScrollView scrollIndicatorInsets={{ right: 1 }}>
          <ArticleContainer>
            <ArticleTitle>{noticeData.title}</ArticleTitle>
            <ArticleAdditionalInformation>
              {noticeData.createdDate}
            </ArticleAdditionalInformation>
            <ArticleAdditionalInformation>
              {`${noticeData.authorName} / ${noticeData.authorDept} / ${noticeData.deptName}`}
            </ArticleAdditionalInformation>
            <AutoHeightWebView
              originWhitelist={["*"]}
              scrollEnabled={false}
              overScrollMode={"never"}
              scalesPageToFit={true}
              source={{ html: noticeData.contentHtml }}
              viewportContent={"width=device-width, user-scalable=no"}
              customStyle={`
                img {
                  display: block; max-width: 100%; height: auto;
                }
              `}
              style={{
                width: Dimensions.get("window").width - 32,
              }}
            />
          </ArticleContainer>
        </ScrollView>
      </AppLayout>
    );
  } else {
    return <AppLayout title="데이터가 없습니다." mode="BACK" />;
  }
}
