import * as React from "react";
import AppLayout from "modules/AppLayout";
import { ScrollView, Platform, StatusBar, StyleSheet, View, Text } from "react-native";
import HeaderRightButton from "./HeaderRightButton";
import theme from "theme";
import { Dimensions } from "react-native";
import AutoHeightWebView from "react-native-autoheight-webview";
import { useNavigation } from "@react-navigation/native";
import { AdMobBanner } from "expo-ads-admob";
import * as WebBrowser from "expo-web-browser";
import LoadingIndicator from "modules/LoadingIndicator";
import { useQuery } from "@apollo/client";
import { GET_NOTICE_BY_NOTICE_ID } from "./queries";
import { NoticeArticleData } from "./redux/types";

type ArticleProps = {
  key: string;
  name: string;
  params: {
    id: string;
  };
};

export default function Article({ route }: { route: ArticleProps }) {
  const { id } = route.params;
  const navigation = useNavigation();

  const { loading, data } = useQuery<NoticeArticleData>(GET_NOTICE_BY_NOTICE_ID, {
    variables: {
      id,
    },
  });

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        typeof data !== "undefined" && (
          <HeaderRightButton
            url={data.getNotice.url}
            notice={data.getNotice}
            attachment={data.getNotice.attachmentLink}
          />
        ),
    });
  });

  if (loading === true) {
    return (
      <AppLayout>
        <LoadingIndicator />
      </AppLayout>
    );
  }

  if (typeof data !== "undefined") {
    return (
      <AppLayout>
        <ScrollView scrollIndicatorInsets={{ right: 1 }}>
          <AdMobBanner
            bannerSize="smartBannerPortrait"
            adUnitID={
              Platform.OS == "ios" ? "ca-app-pub-2034052364864446/2682349606" : "ca-app-pub-2034052364864446/5161544413"
            }
          />
          <View style={ArticleStyles.container}>
            <Text style={ArticleStyles.title}>{data.getNotice.title}</Text>
            <Text style={ArticleStyles.additionalInformation}>{data.getNotice.createdDatetime}</Text>
            <Text style={ArticleStyles.additionalInformation}>
              {`${data.getNotice.authorName}`}
              {data.getNotice.authorDept && ` / ${data.getNotice.authorDept}`}
              {` / ${data.getNotice.department.deptType}`}
            </Text>
            {typeof data.getNotice.contentHtml !== "undefined" && (
              <AutoHeightWebView
                originWhitelist={["*"]}
                scrollEnabled={false}
                overScrollMode={"never"}
                source={{ html: data.getNotice.contentHtml }}
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
                onNavigationStateChange={() => {
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
          </View>
        </ScrollView>
      </AppLayout>
    );
  }
  return <AppLayout noDataText="불러올 공지사항이 없습니다." />;
}

const ArticleStyles = StyleSheet.create({
  container: { margin: 16 },
  title: {
    color: theme.colors.black,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  additionalInformation: {
    color: theme.colors.darkGrey,
    marginBottom: 16,
  },
});
