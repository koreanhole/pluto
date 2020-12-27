import { createReducer } from "typesafe-actions";
import { FetchState } from "redux/types";
import { combineReducers } from "redux";
import { fetchInitialNoticeListAsync, fetchNoticeDataAsync } from "./actions";
import { NoticeArticle } from "./types";

const reducer = combineReducers({
  intialNoticeListFetchState: createReducer("READY" as FetchState)
    .handleAction(fetchInitialNoticeListAsync.request, () => "READY")
    .handleAction(fetchInitialNoticeListAsync.success, () => "SUCCESS")
    .handleAction(fetchInitialNoticeListAsync.failure, () => "FAILURE"),
  homeInitialNoticeList: createReducer<NoticeArticle[] | null>(null).handleAction(
    fetchInitialNoticeListAsync.success,
    (state, action) => {
      if (action.payload !== null && action.payload.pageType == "HOME") {
        return action.payload.noticeArticles;
      }
      return state;
    },
  ),
  allArticleInitialNoticeList: createReducer<NoticeArticle[] | null>(null).handleAction(
    fetchInitialNoticeListAsync.success,
    (state, action) => {
      if (action.payload !== null && action.payload.pageType == "ALL_ARTICLE") {
        return action.payload.noticeArticles;
      }
      return state;
    },
  ),

  noticeDataFetchState: createReducer("READY" as FetchState)
    .handleAction(fetchNoticeDataAsync.request, () => "READY")
    .handleAction(fetchNoticeDataAsync.success, () => "SUCCESS")
    .handleAction(fetchNoticeDataAsync.failure, () => "FAILURE"),
  noticeData: createReducer<NoticeArticle | null>(null).handleAction(fetchNoticeDataAsync.success, (_state, action) => {
    return action.payload;
  }),
});

export default reducer;
