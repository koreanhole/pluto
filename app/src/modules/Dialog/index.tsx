import * as React from "react";
import { ScrollView } from "react-native";
import { Dialog as RnpDialog, Portal } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { getDialogVisible, getDialogContent } from "./redux/selectors";
import { dismissDialog } from "./redux/actions";

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
          <ScrollView>{dialogContent()}</ScrollView>
        </RnpDialog.ScrollArea>
      </RnpDialog>
    </Portal>
  );
}
