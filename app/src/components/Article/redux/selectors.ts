import { RootState } from "redux/types";

export const getSavedArticle = (state: RootState) => state.article.savedNotice;

export const getNoticeFetchState = (state: RootState) =>
  state.article.intialNoticeListFetchState;

export const getHomeInitialNotice = (state: RootState) =>
  state.article.homeInitialNoticeList;

export const getAllArticleInitialNotice = (state: RootState) =>
  state.article.allArticleInitialNoticeList;
