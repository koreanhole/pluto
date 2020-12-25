import { combineReducers } from "redux";
import departmentReducer from "components/Department/redux/reducer";
import articleReducer from "components/Article/redux/reducers";
import articlePersistReducer from "components/Article/redux/persistReducers";
import snackbarReducer from "modules/Snackbar/redux/reducers";

export default combineReducers({
  department: departmentReducer,
  article: articleReducer,
  articlePersist: articlePersistReducer,
  snackBar: snackbarReducer,
});
