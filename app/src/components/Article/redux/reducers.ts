import { createReducer } from "typesafe-actions";
import { FetchState } from "redux/types";
import { combineReducers } from "redux";
import {
  saveNotice,
  deleteSavedNotice,
  fetchInitialNoticeAsync,
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
  intialNoticeFetchState: createReducer("READY" as FetchState)
    .handleAction(fetchInitialNoticeAsync.request, () => "READY")
    .handleAction(fetchInitialNoticeAsync.success, () => "SUCCESS")
    .handleAction(fetchInitialNoticeAsync.failure, () => "FAILURE"),
  homeInitialNotice: createReducer<NoticeArticle[] | null>(null).handleAction(
    fetchInitialNoticeAsync.success,
    (state, action) => {
      if (action.payload !== null && action.payload.pageType == "HOME") {
        return action.payload.noticeArticles;
      }
      return state;
    }
  ),
  allArticleInitialNotice: createReducer<NoticeArticle[] | null>(
    null
  ).handleAction(fetchInitialNoticeAsync.success, (state, action) => {
    if (action.payload !== null && action.payload.pageType == "ALL_ARTICLE") {
      return action.payload.noticeArticles;
    }
    return state;
  }),
});

export default reducer;
