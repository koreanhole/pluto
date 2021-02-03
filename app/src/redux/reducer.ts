import { combineReducers } from "redux";
import departmentReducer from "components/Department/redux/reducers";
import articleReducer from "components/Article/redux/reducers";
import articlePersistReducer from "components/Article/redux/persistReducers";
import snackbarReducer from "modules/Snackbar/redux/reducers";
import dialogReducer from "modules/Dialog/redux/reducers";

export default combineReducers({
  department: departmentReducer,
  article: articleReducer,
  articlePersist: articlePersistReducer,
  snackBar: snackbarReducer,
  dialog: dialogReducer,
});
