import { combineReducers } from "redux";
import { createReducer } from "typesafe-actions";
import { setFavoriteDepartment } from "./actions";

const reducer = combineReducers({
  favoriteDepartment: createReducer<string | null>(null).handleAction(
    setFavoriteDepartment,
    (_state, action) => action.type
  ),
});

export default reducer;
