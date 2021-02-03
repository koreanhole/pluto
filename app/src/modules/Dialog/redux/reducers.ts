import { combineReducers } from "redux";
import { createReducer } from "typesafe-actions";
import { showDialog, dismissDialog, setDialogContent } from "./actions";

const reducer = combineReducers({
  visible: createReducer<boolean>(false)
    .handleAction(showDialog, () => true)
    .handleAction(dismissDialog, () => false),
  content: createReducer<React.ReactNode>(null).handleAction(setDialogContent, (_state, action) => action.payload),
});

export default reducer;
