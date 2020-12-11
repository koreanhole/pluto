import { fork } from "redux-saga/effects";
import articleSaga from "components/Article/redux/sagas";

export default function* rootSaga() {
  yield fork(articleSaga);
}
