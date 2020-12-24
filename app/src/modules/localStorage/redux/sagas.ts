import { call, put, takeEvery } from "redux-saga/effects";
import {
  saveAsyncStorageData,
  getAsyncStorageData,
} from "repository/localStorage";
import {
  storeLocalStorageAsync,
  STORE_LOCAL_STORAGE_REQUEST,
  STORE_LOCAL_STORAGE_SUCCESS,
  STORE_LOCAL_STORAGE_FAILURE,
} from "./actions";

const storeLocalStorage = function* (
  action: ReturnType<typeof storeLocalStorageAsync.request>
) {
  const { dataType, data } = action.payload;
  try {
    let localStorageData = yield call(getAsyncStorageData, dataType);
    if (localStorageData !== null) {
      localStorageData.push(data);
    } else {
      localStorageData = data;
    }
    yield call(saveAsyncStorageData, {
      dataType: dataType,
      data: localStorageData,
    });
    yield put(storeLocalStorageAsync.success(STORE_LOCAL_STORAGE_SUCCESS));
  } catch {
    yield put(storeLocalStorageAsync.failure(STORE_LOCAL_STORAGE_FAILURE));
  }
};

export default function* () {
  yield takeEvery(STORE_LOCAL_STORAGE_REQUEST, storeLocalStorage);
}
