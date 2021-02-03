import * as React from "react";
import { HeaderRightStyles } from "modules/headerRightButton/base";
import theme from "theme";
import { useDispatch } from "react-redux";
import { setDialogContent, showDialog } from "modules/Dialog/redux/actions";
import { View, Image, StyleSheet, Text, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as MailComposer from "expo-mail-composer";
import { showSnackbar } from "../../modules/Snackbar/redux/actions";

type InfoItem = {
  // FIXME: https://github.com/expo/vector-icons/issues/153 이 이슈 해결되면 수정
  iconName: any;
  handleClick: () => void;
};

export default function HeaderRightButton() {
  const dispatch = useDispatch();

  const handleClickGithub = React.useCallback(() => {
    WebBrowser.openBrowserAsync("https://github.com/koreanhole").catch(() => {
      Alert.alert("페이지를 열 수 없습니다.", "", [
        {
          text: "확인",
        },
      ]);
    });
  }, []);

  const handleClickEmail = React.useCallback(async () => {
    if (await MailComposer.isAvailableAsync()) {
      MailComposer.composeAsync({
        recipients: ["koreanhole1@gmail.com"],
      });
    } else {
      dispatch(showSnackbar({ visible: true, message: "이메일을 보낼 수 없습니다." }));
    }
  }, []);

  const handleClickWeb = React.useCallback(() => {
    WebBrowser.openBrowserAsync("https://koreanhole.github.io").catch(() => {
      Alert.alert("페이지를 열 수 없습니다.", "", [
        {
          text: "확인",
        },
      ]);
    });
  }, []);

  const INFO_ITEMS: InfoItem[] = [
    {
      iconName: "github",
      handleClick: handleClickGithub,
    },
    {
      iconName: "email",
      handleClick: handleClickEmail,
    },
    {
      iconName: "web",
      handleClick: handleClickWeb,
    },
  ];

  const dialogContent = (
    <>
      <View style={DialogContentStyles.imageContainer}>
        <Image source={require("../../../assets/app_introduce.png")} />
      </View>
      <View style={DialogContentStyles.infoContainer}>
        <Text style={DialogContentStyles.infoTitleText}>개발자</Text>
        <View style={DialogContentStyles.infoItemContainer}>
          <Text>koreanhole</Text>
        </View>
        <View style={DialogContentStyles.infoItemContainer}>
          <View style={DialogContentStyles.infoItemIconContainer}>
            {INFO_ITEMS.map((item) => (
              <MaterialCommunityIcons
                key={item.iconName}
                size={32}
                style={DialogContentStyles.infoItemIcon}
                name={item.iconName}
                onPress={item.handleClick}
              />
            ))}
          </View>
        </View>
      </View>
    </>
  );

  const handleClickQuestionClicked = React.useCallback(() => {
    dispatch(showDialog());
    dispatch(setDialogContent(dialogContent));
  }, []);

  return (
    <MaterialIcons
      name="info-outline"
      size={theme.size.headerIconSize}
      style={HeaderRightStyles.icon}
      onPress={handleClickQuestionClicked}
    />
  );
}

const DialogContentStyles = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
    marginTop: 32,
  },
  infoContainer: {
    margin: 32,
    alignSelf: "center",
    alignItems: "center",
  },
  infoTitleText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  infoItemContainer: {
    marginTop: 24,
  },
  infoItemIconContainer: {
    flexDirection: "row",
  },
  infoItemIcon: {
    marginHorizontal: 12,
  },
});
