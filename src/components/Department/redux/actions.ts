import { createAction } from "typesafe-actions";

export const addToFavoriteDepartmentList = createAction(
  "ADD_FAVORITE_DEPARTMENT_LIST"
)<string>();

export const deleteFromFavoriteDepartmentList = createAction(
  "DELETE_FAVORITE_DEPARTMENT_LIST"
)<string>();
