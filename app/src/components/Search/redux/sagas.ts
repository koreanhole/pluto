import { NoticeArticle } from "components/Article/redux/types";
import { SEARCH_NOTICE_REQUEST, SEARCH_NOTICE_FAILURE, searchNoticeAsync } from "./actions";
import { call, put, takeEvery } from "redux-saga/effects";
import { loadSearchedNoticeList } from "repository/firestore";

const searchNotice = function* (action: ReturnType<typeof searchNoticeAsync.request>) {
  const { departmentList, pageType, query } = action.payload;
  try {
    const noticeData: NoticeArticle[] | null = yield call(loadSearchedNoticeList, departmentList, query);
    yield put(
      searchNoticeAsync.success({
        pageType: pageType,
        noticeArticles: noticeData,
      }),
    );
  } catch {
    yield put(searchNoticeAsync.failure(SEARCH_NOTICE_FAILURE));
  }
};

export default function* () {
  yield takeEvery(SEARCH_NOTICE_REQUEST, searchNotice);
}
