import { createAction } from "typesafe-actions";
import { ArticleId } from "./types";

export const setArticleId = createAction("SET_ARTICLE_ID")<ArticleId>();
