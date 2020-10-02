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
        const sortedNotices = _.sortBy(
          [...state, action.payload],
          "createdDateTimestamp"
        );
        return _.uniq(sortedNotices, true);
      }
    })
    .handleAction(deleteSavedNotice, (state, action) => {
      if (state !== null) {
        return _.reject(state, (item) => {
          return action.payload.title === item.title;
        });
      } else {
        return [];
      }
    }),
});

export default reducer;
