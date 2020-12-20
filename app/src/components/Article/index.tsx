import * as React from "react";
import AppLayout from "modules/AppLayout";
import { ScrollView, Platform, Alert, StatusBar } from "react-native";
import styled from "styled-components/native";
import HeaderRightButton from "./HeaderRightButton";
import theme from "theme";
import { noticeFirestore } from "apis/firestore";
import { NoticeArticle } from "./redux/types";
import { Dimensions } from "react-native";
import AutoHeightWebView from "react-native-autoheight-webview";
import { useNavigation } from "@react-navigation/native";
import { getNoticeDocumentId } from "apis/firestore";
import { AdMobBanner } from "expo-ads-admob";
import * as WebBrowser from "expo-web-browser";
import LoadingIndicator from "modules/LoadingIndicator";

type ArticleProps = {
  key: string;
  name: string;
  params: {
    deptCode: string;
    listId: string;
  };
};

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

export default function Article({ route }: { route: ArticleProps }) {
  const navigation = useNavigation();

  const [noticeData, setNoticeData] = React.useState<NoticeArticle>();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRightButton
          url={typeof noticeData !== "undefined" ? noticeData.url : ""}
          notice={noticeData}
          attachment={
            typeof noticeData !== "undefined"
              ? noticeData.attachmentLink
              : undefined
          }
        />
      ),
    });
  });

  React.useEffect(() => {
    fetchNoticeData();
  }, [route]);

  if (typeof noticeData !== "undefined") {
    return (
      <AppLayout>
        <ScrollView scrollIndicatorInsets={{ right: 1 }}>
          <AdMobBanner
            bannerSize="smartBannerPortrait"
            adUnitID={
              Platform.OS == "ios"
                ? "ca-app-pub-2034052364864446/2682349606"
                : "ca-app-pub-2034052364864446/5161544413"
            }
          />
          <ArticleContainer>
            <ArticleTitle>{noticeData.title}</ArticleTitle>
            <ArticleAdditionalInformation>
              {noticeData.createdDate}
            </ArticleAdditionalInformation>
            <ArticleAdditionalInformation>
              {`${noticeData.authorName}`}
              {noticeData.authorDept && ` / ${noticeData.authorDept}`}
              {` / ${noticeData.deptName}`}
            </ArticleAdditionalInformation>
            {typeof noticeData.contentHtml !== "undefined" && (
              <AutoHeightWebView
                originWhitelist={["*"]}
                scrollEnabled={false}
                overScrollMode={"never"}
                source={{ html: noticeData.contentHtml }}
                startInLoadingState={true}
                renderLoading={() => {
                  return <LoadingIndicator />;
                }}
                onShouldStartLoadWithRequest={(navState) => {
                  if (navState.url !== "about:blank") {
                    WebBrowser.openBrowserAsync(navState.url);
                    return false;
                  } else {
                    return true;
                  }
                }}
                // react-native-webview 10.7에서 수정됨
                onNavigationStateChange={(_navState) => {
                  StatusBar.setBarStyle("dark-content");
                }}
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
            )}
          </ArticleContainer>
        </ScrollView>
      </AppLayout>
    );
  } else {
    return <AppLayout />;
  }
}
