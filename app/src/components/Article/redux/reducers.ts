import { createReducer } from "typesafe-actions";
import { FetchState } from "redux/types";
import { combineReducers } from "redux";
import {
  saveNotice,
  deleteSavedNotice,
  fetchInitialNoticeListAsync,
  fetchNoticeDataAsync,
} from "./actions";
import { NoticeArticle } from "./types";
import _ from "underscore";

const reducer = combineReducers({
  savedNotice: createReducer<NoticeArticle[] | null>(null)
    .handleAction(saveNotice, (state, action) => {
      if (state == null) {
        return [action.payload];
      } else {
        const sortedNotices = _.sortBy(
          [...state, action.payload],
          "createdDateTimestamp"
        );
        return _.uniq(sortedNotices, true);
      }
    })
    .handleAction(deleteSavedNotice, (state, action) => {
      if (state !== null) {
        return _.reject(state, (item) => {
          return action.payload.title === item.title;
        });
      } else {
        return [];
      }
    }),
  intialNoticeListFetchState: createReducer("READY" as FetchState)
    .handleAction(fetchInitialNoticeListAsync.request, () => "READY")
    .handleAction(fetchInitialNoticeListAsync.success, () => "SUCCESS")
    .handleAction(fetchInitialNoticeListAsync.failure, () => "FAILURE"),
  homeInitialNoticeList: createReducer<NoticeArticle[] | null>(
    null
  ).handleAction(fetchInitialNoticeListAsync.success, (state, action) => {
    if (action.payload !== null && action.payload.pageType == "HOME") {
      return action.payload.noticeArticles;
    }
    return state;
  }),
  allArticleInitialNoticeList: createReducer<NoticeArticle[] | null>(
    null
  ).handleAction(fetchInitialNoticeListAsync.success, (state, action) => {
    if (action.payload !== null && action.payload.pageType == "ALL_ARTICLE") {
      return action.payload.noticeArticles;
    }
    return state;
  }),

  noticeDataFetchState: createReducer("READY" as FetchState)
    .handleAction(fetchNoticeDataAsync.request, () => "READY")
    .handleAction(fetchNoticeDataAsync.success, () => "SUCCESS")
    .handleAction(fetchNoticeDataAsync.failure, () => "FAILURE"),

  noticeData: createReducer<NoticeArticle | null>(null).handleAction(
    fetchNoticeDataAsync.success,
    (state, action) => {
      if (
        typeof action.payload !== "undefined" &&
        action.payload?.noticeArticle !== null
      ) {
        return action.payload?.noticeArticle;
      }
      return state;
    }
  ),
});

export default reducer;
