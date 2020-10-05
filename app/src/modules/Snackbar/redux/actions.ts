import { createAction } from "typesafe-actions";
import { Snackbar } from "./types";

export const showSnackbar = createAction("SHOW_SNACKBAR")<Snackbar>();
