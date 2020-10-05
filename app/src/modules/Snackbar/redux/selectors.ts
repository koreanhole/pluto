import { RootState } from "redux/types";

export const getSnackBarState = (state: RootState) => state.snackBar.state;
