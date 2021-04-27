import { combineReducers } from "redux";
import { createReducer } from "typesafe-actions";
import { FetchState } from "redux/types";
import { searchNoticeAsync } from "./actions";
import { NoticeArticle } from "../../Article/redux/types";

const reducer = combineReducers({
  searchNoticeFetchState: createReducer("READY" as FetchState)
    .handleAction(searchNoticeAsync.request, () => "READY")
    .handleAction(searchNoticeAsync.success, () => "SUCCESS")
    .handleAction(searchNoticeAsync.failure, () => "FAILURE"),

  searchedNotice: createReducer<NoticeArticle[] | null>(null).handleAction(
    searchNoticeAsync.success,
    (_state, action) => {
      if (
        action.payload !== null &&
        action.payload.pageType == "HOME" &&
        typeof action.payload.noticeArticles !== "undefined"
      ) {
        return action.payload.noticeArticles;
      }
      return null;
    },
  ),
});

export default reducer;
