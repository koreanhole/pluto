import * as React from "react";
import { View } from "react-native";
import { HeaderRightStyles } from "modules/headerRightButton/base";
import { MaterialIcons } from "@expo/vector-icons";
import theme from "theme";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useDispatch } from "react-redux";
import { sortSavedNotice } from "components/Article/redux/actions";

export default function HeaderRightButton() {
  const dispatch = useDispatch();
  const { showActionSheetWithOptions } = useActionSheet();

  const handleFilterIconClicked = React.useCallback(() => {
    showActionSheetWithOptions(
      {
        title: "공지사항 정렬방법 선택",
        options: ["취소", "오래된 순서", "최신 순서"],
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex == 1) {
          dispatch(sortSavedNotice("ASCENDING"));
        }
        if (buttonIndex == 2) {
          dispatch(sortSavedNotice("DESCENDING"));
        }
      }
    );
  }, []);
  return (
    <View style={HeaderRightStyles.container}>
      <MaterialIcons
        name="filter-list"
        size={theme.size.headerIconSize}
        style={HeaderRightStyles.icon}
        onPress={handleFilterIconClicked}
      />
    </View>
  );
}
