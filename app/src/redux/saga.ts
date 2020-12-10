import { all } from "redux-saga/effects";
import homeSaga from "components/Home/redux/sagas";

export default function* rootSaga() {
  yield all([homeSaga()]);
}
