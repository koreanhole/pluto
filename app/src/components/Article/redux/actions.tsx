import { createAction } from "typesafe-actions";
import { ArticleId } from "./types";
import { NoticeArticle } from "./types";

export const setArticleId = createAction("SET_ARTICLE_ID")<ArticleId>();

export const saveNotice = createAction("SAVE_NOTICE")<NoticeArticle>();

export const deleteSavedNotice = createAction("DELETE_SAVED_NOTICE")<
  NoticeArticle
>();
