import { RootState } from "redux/types";

export const getNoticeFetchState = (state: RootState) =>
  state.home.intialNoticeFetchState;

export const getHomeInitialNotice = (state: RootState) =>
  state.home.homeInitialNotice;

export const getAllArticleInitialNotice = (state: RootState) =>
  state.home.allArticleInitialNotice;
