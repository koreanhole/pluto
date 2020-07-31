import { createAction } from "typesafe-actions";

export const setFavoriteDepartment = createAction("SET_FAVORITE_DEPARTMENT")<
  string
>();
