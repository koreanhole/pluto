import { createAction } from "typesafe-actions";
import { NoticeArticle } from "./types";

export const saveNotice = createAction("SAVE_NOTICE")<NoticeArticle>();

export const deleteSavedNotice = createAction("DELETE_SAVED_NOTICE")<
  NoticeArticle
>();
