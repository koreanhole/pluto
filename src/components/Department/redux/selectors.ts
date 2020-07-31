import { RootState } from "redux/types";

export const getFavoriteDepartmentList = (state: RootState) =>
  state.department.favoriteDepartment;
