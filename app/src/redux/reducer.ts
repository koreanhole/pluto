import { combineReducers } from "redux";
import departmentPersistReducer from "components/Department/redux/persistReducers";
import articleReducer from "components/Article/redux/reducers";
import articlePersistReducer from "components/Article/redux/persistReducers";
import snackbarReducer from "modules/Snackbar/redux/reducers";

export default combineReducers({
  departmentPersist: departmentPersistReducer,
  article: articleReducer,
  articlePersist: articlePersistReducer,
  snackBar: snackbarReducer,
});
