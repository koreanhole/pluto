import { combineReducers } from "redux";
import departmentReducer from "components/Department/redux/reducer";
import articleReducer from "components/Article/redux/reducers";
import snackbarReducer from "modules/Snackbar/redux/reducers";

export default combineReducers({
  department: departmentReducer,
  article: articleReducer,
  snackBar: snackbarReducer,
});
