import { RootState } from "redux/types";

export const getFavoriteDepartmentList = (state: RootState) =>
  state.department.favoriteDepartment;

export const getExpoPushToken = (state: RootState) =>
  state.department.expoPushToken;

export const getShowSnackBar = (state: RootState) =>
  state.department.showSnackBar;
