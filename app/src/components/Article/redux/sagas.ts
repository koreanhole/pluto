import { NoticeArticle } from "components/Article/redux/types";
import {
  fetchInitialNoticeAsync,
  FETCH_INITIAL_NOTICE_REQUEST,
} from "./actions";
import { Alert } from "react-native";
import { call, put, takeEvery } from "redux-saga/effects";
import { loadInitialNotice } from "apis/firestore";

const fetchInitialNotice = function* (
  action: ReturnType<typeof fetchInitialNoticeAsync.request>
) {
  const { departmentList, pageType } = action.payload;
  try {
    const noticeData: NoticeArticle[] | null = yield call(
      loadInitialNotice,
      departmentList
    );
    yield put(
      fetchInitialNoticeAsync.success({
        pageType: pageType,
        noticeArticles: noticeData,
      })
    );
  } catch {
    yield put(fetchInitialNoticeAsync.failure("NOTICE_CANNOT_FETCH"));
    Alert.alert("공지사항을 불러올 수 없습니다.", "잠시 후 다시 시도해주세요", [
      {
        text: "확인",
      },
    ]);
  }
};

export default function* () {
  yield takeEvery(FETCH_INITIAL_NOTICE_REQUEST, fetchInitialNotice);
}
