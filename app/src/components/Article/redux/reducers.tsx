import { createReducer } from "typesafe-actions";
import { combineReducers } from "redux";
import { setArticleId, saveNotice, deleteSavedNotice } from "./actions";
import { ArticleId, NoticeArticle } from "./types";
import _ from "underscore";

const reducer = combineReducers({
  articleId: createReducer<ArticleId>({
    deptCode: "",
    listId: "",
  }).handleAction(setArticleId, (_state, action) => {
    return action.payload;
  }),
  savedNotice: createReducer<NoticeArticle[] | null>(null)
    .handleAction(saveNotice, (state, action) => {
      if (state == null) {
        return [action.payload];
      } else {
        return [...state, action.payload];
      }
    })
    .handleAction(deleteSavedNotice, (state, action) => {
      if (state !== null) {
        return _.without(state, action.payload);
      } else {
        return [];
      }
    }),
});

export default reducer;
