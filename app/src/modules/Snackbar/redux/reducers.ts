import { createReducer } from "typesafe-actions";
import { combineReducers } from "redux";
import { showSnackbar } from "./actions";
import { Snackbar } from "./types";

const reducer = combineReducers({
  state: createReducer<Snackbar>({ visible: false, message: "" }).handleAction(
    showSnackbar,
    (_state, action) => {
      return action.payload;
    }
  ),
});

export default reducer;
