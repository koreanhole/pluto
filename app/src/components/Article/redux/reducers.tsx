import { createReducer } from "typesafe-actions";
import { combineReducers } from "redux";
import { setArticleId } from "./actions";
import { ArticleId } from "./types";

const reducer = combineReducers({
  articleId: createReducer<ArticleId>({
    deptCode: "",
    listId: "",
  }).handleAction(setArticleId, (_state, action) => {
    return action.payload;
  }),
});

export default reducer;
