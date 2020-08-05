import * as React from "react";
import AppLayout from "modules/AppLayout";
import { ScrollView } from "react-native";
import styled from "styled-components/native";
import HTML from "react-native-render-html";
import {
  IGNORED_TAGS,
  alterNode,
  makeTableRenderer,
} from "react-native-render-html-table-bridge";
import WebView from "react-native-webview";
import HeaderRightButton from "./HeaderRightButton";
import theme from "theme";
import { useSelector } from "react-redux";
import { getArticleId } from "./redux/selectors";
import { noticeFirestore } from "firebase/firestore";
import { NoticeArticle } from "./redux/types";
import { Linking } from "react-native";
import { Dimensions } from "react-native";

const config = {
  WebViewComponent: WebView,
  autoHeight: false,
};

const renderers = {
  table: makeTableRenderer(config),
};

const htmlConfig = {
  alterNode,
  renderers,
  ignoredTags: IGNORED_TAGS,
};

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

  const handleClickHtmlLink = React.useCallback((href: string) => {
    if (typeof href !== "undefined") {
      Linking.openURL(href).catch((err) =>
        console.error("Couldn't load page", err)
      );
    }
  }, []);

  React.useEffect(() => {
    fetchNoticeData();
  }, [articleId]);
  if (typeof noticeData !== "undefined") {
    return (
      <AppLayout
        title={noticeData.title}
        mode="BACK"
        rightComponent={<HeaderRightButton url={noticeData.url} />}
      >
        <ScrollView>
          <ArticleContainer>
            <ArticleAdditionalInformation>
              {noticeData.createdDate}
            </ArticleAdditionalInformation>
            <ArticleAdditionalInformation>
              {`${noticeData.authorName} / ${noticeData.authorDept} / ${noticeData.deptName}`}
            </ArticleAdditionalInformation>
            {/* @ts-ignore */}
            <HTML
              {...htmlConfig}
              ignoredTags={[...IGNORED_TAGS]}
              html={noticeData.contentHtml}
              textSelectable={true}
              imagesMaxWidth={Dimensions.get("window").width - 32}
              onLinkPress={(_event, href) => handleClickHtmlLink(href)}
            />
          </ArticleContainer>
        </ScrollView>
      </AppLayout>
    );
  } else {
    return <AppLayout title="데이터가 없습니다." mode="BACK" />;
  }
}
