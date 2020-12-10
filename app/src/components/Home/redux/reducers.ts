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
  initialNotice: createReducer<NoticeArticle[] | null>(null).handleAction(
    fetchInitialNoticeAsync.success,
    (_state, action) => action.payload
  ),
});

export default reducer;
