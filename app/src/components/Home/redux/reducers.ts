import { FetchState } from "redux/types";
import { fetchInitialNoticeAsync } from "./actions";
import { combineReducers } from "redux";
import { createReducer } from "typesafe-actions";
import { NoticeArticle } from "components/Article/redux/types";

const reducer = combineReducers({
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
