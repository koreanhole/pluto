import { createAction, createAsyncAction } from "typesafe-actions";
import {
  NoticeArticle,
  FetchInitialNoticeListRequestPayload,
  FetchInitialNoticeListSuccessPayload,
  FetchNoticeRequestPayload,
} from "./types";

export const FETCH_INITIAL_NOTICE_LIST_REQUEST =
  "FETCH_INITIAL_NOTICE_LIST_REQUEST";
export const FETCH_INITIAL_NOTICE_LIST_SUCCESS =
  "FETCH_INITIAL_NOTICE_LIST_SUCCESS";
export const FETCH_INITIAL_NOITICE_LIST_FAILURE =
  "FETCH_INITIAL_NOITICE_LIST_FAILURE";

export const FETCH_NOTICE_DATA_REQUEST = "FETCH_NOTICE_DATA_REQUEST";
export const FETCH_NOTICE_DATA_SUCCESS = "FETCH_NOTICE_DATA_SUCCESS";
export const FETCH_NOITICE_DATA_FAILURE = "FETCH_NOITICE_DATA_FAILURE";

export const saveNotice = createAction("SAVE_NOTICE")<NoticeArticle>();

export const deleteSavedNotice = createAction(
  "DELETE_SAVED_NOTICE"
)<NoticeArticle>();

export const fetchInitialNoticeListAsync = createAsyncAction(
  FETCH_INITIAL_NOTICE_LIST_REQUEST,
  FETCH_INITIAL_NOTICE_LIST_SUCCESS,
  FETCH_INITIAL_NOITICE_LIST_FAILURE
)<
  FetchInitialNoticeListRequestPayload,
  FetchInitialNoticeListSuccessPayload | null,
  string
>();

export const fetchNoticeDataAsync = createAsyncAction(
  FETCH_NOTICE_DATA_REQUEST,
  FETCH_NOTICE_DATA_SUCCESS,
  FETCH_NOITICE_DATA_FAILURE
)<FetchNoticeRequestPayload, NoticeArticle | null, string>();
