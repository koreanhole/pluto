import { createAction, createAsyncAction } from "typesafe-actions";
import {
  NoticeArticle,
  FetchInitialNoticeListPayload,
  FetchInitialNoticeListSuccessPayload,
} from "./types";

export const FETCH_INITIAL_NOTICE_LIST_REQUEST =
  "FETCH_INITIAL_NOTICE_LIST_REQUEST";
export const FETCH_INITIAL_NOTICE_LIST_SUCCESS =
  "FETCH_INITIAL_NOTICE_LIST_SUCCESS";
export const FETCH_INITIAL_NOITICE_LIST_FAILURE =
  "FETCH_INITIAL_NOITICE_LIST_FAILURE";

export const saveNotice = createAction("SAVE_NOTICE")<NoticeArticle>();

export const deleteSavedNotice = createAction(
  "DELETE_SAVED_NOTICE"
)<NoticeArticle>();

export const fetchInitialNoticeListAsync = createAsyncAction(
  FETCH_INITIAL_NOTICE_LIST_REQUEST,
  FETCH_INITIAL_NOTICE_LIST_SUCCESS,
  FETCH_INITIAL_NOITICE_LIST_FAILURE
)<
  FetchInitialNoticeListPayload,
  FetchInitialNoticeListSuccessPayload | null,
  string
>();
