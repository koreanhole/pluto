import { NoticeArticle } from "components/Article/redux/types";
import {
  fetchInitialNoticeListAsync,
  FETCH_INITIAL_NOTICE_LIST_REQUEST,
  fetchNoticeDataAsync,
  FETCH_NOTICE_DATA_REQUEST,
} from "./actions";
import { Alert } from "react-native";
import { call, put, takeEvery } from "redux-saga/effects";
import { loadInitialNoticeList, loadNoticeData } from "apis/firestore";

const fetchInitialNoticeList = function* (
  action: ReturnType<typeof fetchInitialNoticeListAsync.request>
) {
  const { departmentList, pageType } = action.payload;
  try {
    const noticeData: NoticeArticle[] | null = yield call(
      loadInitialNoticeList,
      departmentList
    );
    yield put(
      fetchInitialNoticeListAsync.success({
        pageType: pageType,
        noticeArticles: noticeData,
      })
    );
  } catch {
    yield put(fetchInitialNoticeListAsync.failure("NOTICE_LIST_CANNOT_FETCH"));
    Alert.alert(
      "공지사항 목록을 불러올 수 없습니다.",
      "잠시 후 다시 시도해주세요",
      [
        {
          text: "확인",
        },
      ]
    );
  }
};

const fetchInitialNotice = function* (
  action: ReturnType<typeof fetchNoticeDataAsync.request>
) {
  const { deptCode, listId } = action.payload;
  try {
    const noticeData: NoticeArticle | null = yield call(loadNoticeData, {
      deptCode: deptCode,
      listId: listId,
    });
    yield put(fetchNoticeDataAsync.success(noticeData));
  } catch {
    yield put(fetchNoticeDataAsync.failure("NOTICE_CANNOT_FETCH"));
    Alert.alert("공지사항을 불러올 수 없습니다.", "잠시 후 다시 시도해주세요", [
      {
        text: "확인",
      },
    ]);
  }
};

export default function* () {
  yield takeEvery(FETCH_INITIAL_NOTICE_LIST_REQUEST, fetchInitialNoticeList);
  yield takeEvery(FETCH_NOTICE_DATA_REQUEST, fetchInitialNotice);
}
