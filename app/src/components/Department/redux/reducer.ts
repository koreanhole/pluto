import { combineReducers } from "redux";
import { createReducer } from "typesafe-actions";
import {
  addToFavoriteDepartmentList,
  deleteFromFavoriteDepartmentList,
  setExpoPushToken,
  setShowSnackBar,
} from "./actions";
import _ from "underscore";

const DEFALUT_DEPARTMENT_LIST = ["일반공지", "학사공지"];

const reducer = combineReducers({
  favoriteDepartment: createReducer<string[]>(DEFALUT_DEPARTMENT_LIST)
    .handleAction(addToFavoriteDepartmentList, (state, action) => {
      if (state !== null) {
        return _.uniq([...state, action.payload]);
      } else {
        return [action.payload];
      }
    })
    .handleAction(deleteFromFavoriteDepartmentList, (state, action) => {
      if (state !== null) {
        return state.filter((item) => item !== action.payload);
      } else {
        return state;
      }
    }),
  expoPushToken: createReducer<string | undefined | null>(null).handleAction(
    setExpoPushToken,
    (_state, action) => {
      return action.payload;
    }
  ),
  showSnackBar: createReducer<boolean>(false).handleAction(
    setShowSnackBar,
    (_state, action) => {
      return action.payload;
    }
  ),
});

export default reducer;
