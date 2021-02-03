import * as React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Dialog as RnpDialog, Portal } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { getDialogVisible, getDialogContent } from "./redux/selectors";
import { dismissDialog } from "./redux/actions";
import { MaterialIcons } from "@expo/vector-icons";
import theme from "theme";

export default function Dialog() {
  const dispatch = useDispatch();
  const dialogVisible = useSelector(getDialogVisible);
  const dialogContent = useSelector(getDialogContent);

  const onDismissDialog = React.useCallback(() => {
    dispatch(dismissDialog());
  }, []);

  return (
    <Portal>
      <RnpDialog visible={dialogVisible} onDismiss={onDismissDialog}>
        <RnpDialog.ScrollArea>
          <View style={DialogStyles.closeContainer}>
            <MaterialIcons
              name="close"
              size={theme.size.headerIconSize}
              color={theme.colors.black}
              onPress={onDismissDialog}
            />
          </View>
          <ScrollView>{dialogContent}</ScrollView>
        </RnpDialog.ScrollArea>
      </RnpDialog>
    </Portal>
  );
}

const DialogStyles = StyleSheet.create({
  closeContainer: {
    marginTop: 16,
    flexDirection: "row-reverse",
  },
});
