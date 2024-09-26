import { RootState } from "redux/types";

export const getSearchedArticle = (state: RootState) => state.search.searchedNotice;

export const getSearchArticleFetchState = (state: RootState) => state.search.searchNoticeFetchState;
