import { createAction } from "typesafe-actions";

export const showDialog = createAction("SHOW_DIALOG")();

export const dismissDialog = createAction("DISMISS_DIALOG")();

export const setDialogContent = createAction("SET_DIALOG_CONTENT")<React.ReactElement>();
