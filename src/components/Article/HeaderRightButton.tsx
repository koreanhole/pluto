import * as React from "react";
import { Icon } from "react-native-elements";
import styled from "styled-components/native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { Attachment } from "./redux/types";
import * as FileSystem from "expo-file-system";
import * as Linking from "expo-linking";
import * as Sharing from "expo-sharing";

const HeaderRightButtonContainer = styled.View`
  flex-direction: row;
`;

export default function HeaderRightButton({
  url,
  attachment,
}: {
  url?: string;
  attachment: Attachment[];
}) {
  const { showActionSheetWithOptions } = useActionSheet();

  const fileLink = attachment.map((item) => {
    return item.file_link;
  });
  const fileName = attachment.map((item) => {
    return item.file_name;
  });
  fileName.splice(0, 0, "취소");

  const handleClickOpenInBrowserButton = React.useCallback(() => {
    if (typeof url !== "undefined") {
      Linking.openURL(url).catch((err) =>
        console.error("Couldn't load page", err)
      );
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
      {attachment.length !== 0 && (
        <Icon
          name="cloud-download"
          type="material"
          onPress={handleClickDownloadButton}
          style={{ marginRight: 10 }}
        />
      )}
      <Icon
        name="public"
        type="material"
        onPress={handleClickOpenInBrowserButton}
      />
    </HeaderRightButtonContainer>
  );
}
