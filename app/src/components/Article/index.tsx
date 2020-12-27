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
import { useDispatch, useSelector } from "react-redux";
import { fetchNoticeDataAsync } from "./redux/actions";
import { getNoticeData, getNoticeDataFetchState } from "./redux/selectors";

type ArticleProps = {
  key: string;
  name: string;
  params: {
    deptCode: string;
    listId: string;
  };
};

export default function Article({ route }: { route: ArticleProps }) {
  const { deptCode, listId } = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const noticeData = useSelector(getNoticeData);
  const noticeDataFetchState = useSelector(getNoticeDataFetchState);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRightButton
          url={noticeData !== null ? noticeData.url : ""}
          notice={noticeData}
          attachment={noticeData !== null ? noticeData.attachmentLink : undefined}
        />
      ),
    });
  });

  React.useEffect(() => {
    dispatch(
      fetchNoticeDataAsync.request({
        deptCode: deptCode,
        listId: listId,
      }),
    );
  }, [route]);

  if (noticeData !== null && noticeDataFetchState === "SUCCESS") {
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
            <Text style={ArticleStyles.title}>{noticeData.title}</Text>
            <Text style={ArticleStyles.additionalInformation}>{noticeData.createdDate}</Text>
            <Text style={ArticleStyles.additionalInformation}>
              {`${noticeData.authorName}`}
              {noticeData.authorDept && ` / ${noticeData.authorDept}`}
              {` / ${noticeData.deptName}`}
            </Text>
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
  } else {
    return (
      <AppLayout>
        <LoadingIndicator />
      </AppLayout>
    );
  }
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
