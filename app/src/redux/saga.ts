import { fork } from "redux-saga/effects";
import articleSaga from "components/Article/redux/sagas";
import departmentSaga from "components/Department/redux/sagas";

export default function* rootSaga() {
  yield fork(articleSaga);
  yield fork(departmentSaga);
}
