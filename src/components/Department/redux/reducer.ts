import { combineReducers } from "redux";
import { createReducer } from "typesafe-actions";
import { addToFavoriteDepartmentList } from "./actions";
import _ from "underscore";

const reducer = combineReducers({
  favoriteDepartment: createReducer<string[] | null>(null).handleAction(
    addToFavoriteDepartmentList,
    (state, action) => {
      if (state !== null) {
        return _.uniq([...state, action.payload]);
      } else {
        return [action.payload];
      }
    }
  ),
});

export default reducer;
