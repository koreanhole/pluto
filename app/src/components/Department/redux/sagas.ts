import { call, put, takeEvery } from "redux-saga/effects";
import { updateUserFavoriteDepartmentList } from "apis/firestore";
import {
  updateUserDataAsync,
  UPLOAD_USER_DATA_REQUEST,
  UPLOAD_USER_DATA_SUCCESS,
  UPLOAD_USER_DATA_FAILURE,
} from "./actions";

const updateUserData = function* (
  action: ReturnType<typeof updateUserDataAsync.request>
) {
  const { favoriteDepartmentList, expoPushToken } = action.payload;
  try {
    yield call(updateUserFavoriteDepartmentList, {
      favoriteDepartmentList: favoriteDepartmentList,
      expoPushToken: expoPushToken,
    });
    yield put(updateUserDataAsync.success(UPLOAD_USER_DATA_SUCCESS));
  } catch {
    yield put(updateUserDataAsync.failure(UPLOAD_USER_DATA_FAILURE));
  }
};

export default function* () {
  yield takeEvery(UPLOAD_USER_DATA_REQUEST, updateUserData);
}
