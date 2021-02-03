import { RootState } from "redux/types";

export const getDialogVisible = (state: RootState) => state.dialog.visible;

export const getDialogContent = (state: RootState) => state.dialog.content;
