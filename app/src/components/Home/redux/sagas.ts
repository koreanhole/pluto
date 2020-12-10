import { noticeFirestore } from "util/firebase/firestore";
import { NoticeArticle } from "components/Article/redux/types";
import {
  fetchInitialNoticeAsync,
  FETCH_INITIAL_NOTICE_REQUEST,
} from "./actions";
import { call, put, takeEvery } from "redux-saga/effects";

const loadInitialNotice = async (departmentList: string[]) => {
  const query = noticeFirestore
    .where("deptName", "in", departmentList)
    .orderBy("createdDate", "desc")
    .limit(50);
  const fetchedData = await query
    .get()
    .then((documentSnapshots) => {
      const fetchedNoticeData: NoticeArticle[] = documentSnapshots.docs.map(
        (document) => {
          const fetchedData = document.data();
          return {
            createdDateTimestamp: fetchedData.createdDateTimestamp,
            deptCode: fetchedData.deptCode,
            deptName: fetchedData.deptName,
            authorDept: fetchedData.authorDept,
            title: fetchedData.title,
            createdDate: fetchedData.createdDate,
            authorName: fetchedData.authorName,
            listId: fetchedData.listId,
            favoriteCount: fetchedData.favoriteCount,
          };
        }
      );
      return fetchedNoticeData;
    })
    .catch(() => {
      return null;
    });
  return fetchedData;
};

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
