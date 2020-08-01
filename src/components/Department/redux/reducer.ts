import { combineReducers } from "redux";
import { Alert } from "react-native";
import { createReducer } from "typesafe-actions";
import {
  addToFavoriteDepartmentList,
  deleteFromFavoriteDepartmentList,
} from "./actions";
import _ from "underscore";

const reducer = combineReducers({
  favoriteDepartment: createReducer<string[] | null>(null)
    .handleAction(addToFavoriteDepartmentList, (state, action) => {
      if (state !== null) {
        if (state.includes(action.payload)) {
          Alert.alert("이미 즐겨찾기에 있습니다.", `${action.payload}`, [
            {
              text: "확인",
            },
          ]);
        }
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
});

export default reducer;
