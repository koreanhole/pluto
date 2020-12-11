import { createAction, createAsyncAction } from "typesafe-actions";
import {
  NoticeArticle,
  FetchInitialNoticePayload,
  FetchInitialNoticeSuccessPayload,
} from "./types";

export const FETCH_INITIAL_NOTICE_REQUEST = "FETCH_INITIAL_NOTICE_REQUEST";
export const FETCH_INITIAL_NOTICE_SUCCESS = "FETCH_INITIAL_NOTICE_SUCCESS";
export const FETCH_INITIAL_NOITICE_FAILURE = "FETCH_INITIAL_NOITICE_FAILURE";

export const saveNotice = createAction("SAVE_NOTICE")<NoticeArticle>();

export const deleteSavedNotice = createAction(
  "DELETE_SAVED_NOTICE"
)<NoticeArticle>();

export const fetchInitialNoticeAsync = createAsyncAction(
  FETCH_INITIAL_NOTICE_REQUEST,
  FETCH_INITIAL_NOTICE_SUCCESS,
  FETCH_INITIAL_NOITICE_FAILURE
)<FetchInitialNoticePayload, FetchInitialNoticeSuccessPayload | null, string>();
