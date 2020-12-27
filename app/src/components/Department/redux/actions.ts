import { createAction, createAsyncAction } from "typesafe-actions";
import { UploadUserDepartmentListRequestPayload } from "./types";

export const UPLOAD_USER_DATA_REQUEST = "UPLOAD_USER_DATA_REQUEST";
export const UPLOAD_USER_DATA_SUCCESS = "UPLOAD_USER_DATA_SUCCESS";
export const UPLOAD_USER_DATA_FAILURE = "UPLOAD_USER_DATA_FAILURE";

export const addToFavoriteDepartmentList = createAction("ADD_FAVORITE_DEPARTMENT_LIST")<string>();

export const deleteFromFavoriteDepartmentList = createAction("DELETE_FAVORITE_DEPARTMENT_LIST")<string>();

export const setExpoPushToken = createAction("SET_EXPO_PUSH_TOKEN")<string | undefined>();

export const updateUserDataAsync = createAsyncAction(
  UPLOAD_USER_DATA_REQUEST,
  UPLOAD_USER_DATA_SUCCESS,
  UPLOAD_USER_DATA_FAILURE,
)<UploadUserDepartmentListRequestPayload, string, string>();
