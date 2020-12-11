import { RootState } from "redux/types";

export const getSavedArticle = (state: RootState) => state.article.savedNotice;

export const getNoticeFetchState = (state: RootState) =>
  state.article.intialNoticeFetchState;

export const getHomeInitialNotice = (state: RootState) =>
  state.article.homeInitialNotice;

export const getAllArticleInitialNotice = (state: RootState) =>
  state.article.allArticleInitialNotice;
