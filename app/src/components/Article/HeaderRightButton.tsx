import * as React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { Attachment } from "./redux/types";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import theme from "theme";
import { Alert } from "react-native";
import * as WebBrowser from "expo-web-browser";

const HeaderRightButtonContainer = styled.View`
  flex-direction: row;
`;

const StyledHeaderRightButton = styled(MaterialIcons)`
  margin-right: 10px;
`;

export default function HeaderRightButton({
  url,
  attachment,
}: {
  url?: string;
  attachment?: Attachment[];
}) {
  const { showActionSheetWithOptions } = useActionSheet();

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
          try {
            const pad = fileName[buttonIndex].split(".").pop();
            // FIXME: 첨부파일의 이름을 한글로 하면 경로를 인식하지 못함
            const uri = FileSystem.downloadAsync(
              fileLink[buttonIndex - 1],
              FileSystem.cacheDirectory + "attachment." + pad
            ).then(({ uri }) => {
              return uri;
            });
            Sharing.shareAsync(await uri);
          } catch (error) {
            console.log(error);
          }
        }
      }
    );
  }, [fileName, fileLink]);
  return (
    <HeaderRightButtonContainer>
      {typeof attachment !== "undefined" && attachment.length !== 0 && (
        <StyledHeaderRightButton
          name="cloud-download"
          size={theme.size.headerIconSize}
          onPress={handleClickDownloadButton}
        />
      )}

      <StyledHeaderRightButton
        name="open-in-browser"
        size={theme.size.headerIconSize}
        onPress={handleClickOpenInBrowserButton}
      />
    </HeaderRightButtonContainer>
  );
}
