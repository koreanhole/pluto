import * as React from "react";
import AppLayout from "modules/AppLayout";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, ScrollView, Linking, Alert, Image, Dimensions } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import theme from "theme";
import Ripple from "react-native-material-ripple";
import Divider from "modules/Divider";
import * as WebBrowser from "expo-web-browser";
import * as StoreReview from "expo-store-review";

type SettingItem = {
  // FIXME: https://github.com/expo/vector-icons/issues/153 이 이슈 해결되면 수정
  iconName: any;
  title: string;
  subTitle?: string;
  handleClick: () => void;
  isExternalLink: boolean;
};

export default function More() {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "더보기",
    });
  });

  const handleClickOpenBachelorSchedule = React.useCallback(() => {
    WebBrowser.openBrowserAsync("https://www.uos.ac.kr/korCalendarYear/list.do?list_id=CA1").catch(() => {
      Alert.alert("페이지를 열 수 없습니다.", "", [
        {
          text: "확인",
        },
      ]);
    });
  }, []);

  const handleClickNotificationSetting = React.useCallback(async () => {
    await Linking.openSettings();
  }, []);
  const handleClickContact = React.useCallback(() => {
    WebBrowser.openBrowserAsync("https://open.kakao.com/o/s165sMNc").catch(() => {
      Alert.alert("페이지를 열 수 없습니다.", "", [
        {
          text: "확인",
        },
      ]);
    });
  }, []);
  const handleClickRating = React.useCallback(async () => {
    const storeReviewAvailable = await StoreReview.isAvailableAsync();
    if (storeReviewAvailable) {
      await StoreReview.requestReview();
    } else {
      const storeUrl = StoreReview.storeUrl();
      if (storeUrl !== null) {
        await Linking.openURL(storeUrl);
      } else {
        Alert.alert("앱스토어를 열 수 없습니다.", "", [
          {
            text: "확인",
          },
        ]);
      }
    }
  }, []);

  const handleClickViewCode = React.useCallback(() => {
    WebBrowser.openBrowserAsync("https://github.com/koreanhole/pluto/tree/develop/app").catch(() => {
      Alert.alert("페이지를 열 수 없습니다.", "", [
        {
          text: "확인",
        },
      ]);
    });
  }, []);

  const SETTING_ITEMS: SettingItem[] = [
    {
      iconName: "calendar-month-outline",
      title: "학사일정",
      handleClick: handleClickOpenBachelorSchedule,
      isExternalLink: true,
    },
    {
      iconName: "bell-outline",
      title: "알림설정",
      handleClick: handleClickNotificationSetting,
      isExternalLink: true,
    },
    {
      iconName: "help-circle-outline",
      title: "문의하기",
      subTitle: "기능추가, 버그 제보",
      handleClick: handleClickContact,
      isExternalLink: true,
    },
    {
      iconName: "emoticon-happy-outline",
      title: "리뷰남기기",
      handleClick: handleClickRating,
      isExternalLink: false,
    },
    {
      iconName: "github",
      title: "UOS공지사항 깃허브",
      handleClick: handleClickViewCode,
      isExternalLink: true,
    },
  ];

  return (
    <AppLayout>
      <ScrollView>
        <Image
          source={require("../../../assets/app_introduce.png")}
          style={{
            alignSelf: "center",
            width: Dimensions.get("window").width,
            marginVertical: 32,
          }}
          resizeMode="cover"
        />
        {SETTING_ITEMS.map((item) => {
          return (
            <Ripple onPress={item.handleClick} key={item.title}>
              <View style={SettingItemStyles.itemContainer}>
                <MaterialCommunityIcons name={item.iconName} size={24} color={theme.colors.primary} />
                <View style={SettingItemStyles.subItemContainer}>
                  <View style={SettingItemStyles.titleTextContainer}>
                    <Text style={SettingItemStyles.titleText}>{item.title}</Text>
                    {typeof item.subTitle !== "undefined" && (
                      <Text style={SettingItemStyles.subTitleText}>{item.subTitle}</Text>
                    )}
                  </View>
                  <View>
                    {item.isExternalLink === true && (
                      <MaterialCommunityIcons
                        name="open-in-new"
                        color={theme.colors.darkGrey}
                        size={16}
                        style={SettingItemStyles.externalLinkIcon}
                      />
                    )}
                  </View>
                </View>
              </View>
              <Divider />
            </Ripple>
          );
        })}
      </ScrollView>
    </AppLayout>
  );
}

const SettingItemStyles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16,
    paddingVertical: 12,
  },
  subItemContainer: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleTextContainer: {
    marginLeft: 16,
  },
  titleText: {
    fontSize: 16,
  },
  subTitleText: {
    fontSize: 12,
    marginTop: 4,
    color: theme.colors.darkGrey,
  },
  icon: {
    fontSize: 24,
    color: theme.colors.black,
  },
  externalLinkIcon: {
    marginRight: 16,
  },
});
