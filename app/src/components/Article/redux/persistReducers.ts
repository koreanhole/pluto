import { createReducer } from "typesafe-actions";
import { combineReducers } from "redux";
import { saveNotice, deleteSavedNotice, sortSavedNotice } from "./actions";
import { NoticeArticle } from "./types";
import _ from "underscore";

const reducer = combineReducers({
  savedNotice: createReducer<NoticeArticle[] | null>(null)
    .handleAction(saveNotice, (state, action) => {
      if (state == null) {
        return [action.payload];
      } else {
        const sortedNotices = _.sortBy([...state, action.payload], "createdDate").reverse();
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
    })
    .handleAction(sortSavedNotice, (state, action) => {
      if (action.payload == "ASCENDING" && state !== null) {
        return _.sortBy(state, "createdDate");
      }
      if (action.payload == "DESCENDING" && state !== null) {
        return _.sortBy(state, "createdDate").reverse();
      }
      return null;
    }),
});

export default reducer;
