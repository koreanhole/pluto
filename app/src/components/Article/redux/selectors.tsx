import { RootState } from "redux/types";

export const getArticleId = (state: RootState) => state.article.articleId;

export const getSavedArticle = (state: RootState) => state.article.savedNotice;
