import { combineReducers } from "redux";
import departmentReducer from "components/Department/redux/reducer";

export default combineReducers({
  department: departmentReducer,
});
