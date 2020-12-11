import { NoticeArticle } from "components/Article/redux/types";
import {
  fetchInitialNoticeAsync,
  FETCH_INITIAL_NOTICE_REQUEST,
} from "./actions";
import { call, put, takeEvery } from "redux-saga/effects";
import { loadInitialNotice } from "apis/firestore";

const fetchInitialNotice = function* (
  action: ReturnType<typeof fetchInitialNoticeAsync.request>
) {
  try {
    const noticeData: NoticeArticle[] | null = yield call(
      loadInitialNotice,
      action.payload
    );
    yield put(fetchInitialNoticeAsync.success(noticeData));
  } catch {
    yield put(fetchInitialNoticeAsync.failure("failure"));
  }
};

export default function* () {
  yield takeEvery(FETCH_INITIAL_NOTICE_REQUEST, fetchInitialNotice);
}
