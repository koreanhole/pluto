import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { Attachment, NoticeArticle } from "./redux/types";
import theme from "theme";
import { Alert, View, Platform, Share } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { HeaderRightStyles } from "modules/headerRightButton/base";
import { saveNotice, deleteSavedNotice } from "./redux/actions";
import { getSavedArticle } from "./redux/selectors";
import _ from "underscore";
import { showSnackbar } from "modules/Snackbar/redux/actions";
import * as Haptics from "expo-haptics";
import { getShareMessage } from "util/share";

export default function HeaderRightButton({
  url,
  attachment,
  notice,
}: {
  url?: string;
  attachment?: Attachment[];
  notice: NoticeArticle | null;
}) {
  const { showActionSheetWithOptions } = useActionSheet();
  const dispatch = useDispatch();
  const savedNoticeArticle = useSelector(getSavedArticle);

  const fileLink =
    typeof attachment !== "undefined"
      ? attachment.map((item) => {
          return item.file_link;
        })
      : [];
  const fileName =
    typeof attachment !== "undefined"
      ? attachment.map((item) => {
          return item.file_name;
        })
      : [];
  fileName.splice(0, 0, "취소");

  const handleClickOpenInBrowserButton = React.useCallback(() => {
    if (typeof url !== "undefined") {
      WebBrowser.openBrowserAsync(url).catch(() => {
        Alert.alert("페이지를 열 수 없습니다.", "", [
          {
            text: "확인",
          },
        ]);
      });
    }
  }, [url]);

  const handleClickDownloadButton = React.useCallback(() => {
    showActionSheetWithOptions(
      {
        title: "첨부파일 다운로드",
        options: fileName,
        cancelButtonIndex: 0,
      },
      async (buttonIndex) => {
        if (buttonIndex !== 0) {
          await WebBrowser.openBrowserAsync(fileLink[buttonIndex - 1]).catch(
            () => {
              Alert.alert("첨부 파일을 열 수 없습니다.", "", [
                {
                  text: "확인",
                },
              ]);
            }
          );
        }
      }
    );
  }, [fileName, fileLink]);

  const handleClickSaveNotice = () => {
    if (notice !== null) {
      dispatch(saveNotice(notice));
      dispatch(
        showSnackbar({
          visible: true,
          message: "공지사항을 저장했습니다.",
        })
      );
      if (Platform.OS == "ios") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
    }
  };

  const handleClickDeleteNotice = () => {
    if (notice !== null) {
      dispatch(deleteSavedNotice(notice));
      dispatch(
        showSnackbar({
          visible: true,
          message: "저장된 공지사항에서 삭제했습니다.",
        })
      );
      if (Platform.OS == "ios") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
    }
  };

  const handleClickShareNotice = React.useCallback(() => {
    if (typeof url !== "undefined") {
      Share.share({ message: getShareMessage(url) }).catch(() => {
        Alert.alert("공지사항을 공유할 수 없습니다.", "", [
          {
            text: "확인",
          },
        ]);
      });
    }
  }, [url]);

  const FavoriteIcon = () => {
    if (
      savedNoticeArticle !== null &&
      notice !== null &&
      _.findWhere(savedNoticeArticle, { title: notice.title })
    ) {
      return (
        <MaterialIcons
          name="favorite"
          size={theme.size.headerIconSize}
          style={HeaderRightStyles.icon}
          onPress={handleClickDeleteNotice}
        />
      );
    } else {
      return (
        <MaterialIcons
          name="favorite-border"
          size={theme.size.headerIconSize}
          style={HeaderRightStyles.icon}
          onPress={handleClickSaveNotice}
        />
      );
    }
  };

  return (
    <View style={HeaderRightStyles.container}>
      <MaterialCommunityIcons
        name="share"
        size={theme.size.headerIconSize}
        onPress={handleClickShareNotice}
        style={HeaderRightStyles.icon}
      />
      {typeof attachment !== "undefined" && attachment.length !== 0 && (
        <MaterialIcons
          name="cloud-download"
          size={theme.size.headerIconSize}
          onPress={handleClickDownloadButton}
          style={HeaderRightStyles.icon}
        />
      )}
      <FavoriteIcon />
      <MaterialIcons
        name="explore"
        size={theme.size.headerIconSize}
        onPress={handleClickOpenInBrowserButton}
        style={HeaderRightStyles.icon}
      />
    </View>
  );
}
