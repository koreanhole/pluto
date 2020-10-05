import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Snackbar as RnpSnackbar } from "react-native-paper";
import { showSnackbar } from "./redux/actions";
import { getSnackBarState } from "./redux/selectors";

export default function Snackbar() {
  const dispatch = useDispatch();
  const snackBarState = useSelector(getSnackBarState);
  const handleDismissSnackbar = React.useCallback(() => {
    dispatch(showSnackbar({ visible: false }));
  }, []);
  return (
    <>
      {snackBarState && (
        <RnpSnackbar
          visible={snackBarState.visible}
          onDismiss={handleDismissSnackbar}
          duration={1000}
        >
          {snackBarState.message}
        </RnpSnackbar>
      )}
    </>
  );
}
