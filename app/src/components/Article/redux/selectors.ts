import { RootState } from "redux/types";

export const getSavedArticle = (state: RootState) => state.articlePersist.savedNotice;

export const getNoticeFetchState = (state: RootState) => state.article.intialNoticeListFetchState;

export const getHomeInitialNotice = (state: RootState) => state.article.homeInitialNoticeList;

export const getAllArticleInitialNotice = (state: RootState) => state.article.allArticleInitialNoticeList;

export const getNoticeData = (state: RootState) => state.article.noticeData;

export const getNoticeDataFetchState = (state: RootState) => state.article.noticeDataFetchState;
