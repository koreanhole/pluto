import { createAsyncAction } from "typesafe-actions";
import {
  FetchInitialNoticePayload,
  FetchInitialNoticeSuccessPayload,
} from "./types";

export const FETCH_INITIAL_NOTICE_REQUEST = "FETCH_INITIAL_NOTICE_REQUEST";
export const FETCH_INITIAL_NOTICE_SUCCESS = "FETCH_INITIAL_NOTICE_SUCCESS";
export const FETCH_INITIAL_NOITICE_FAILURE = "FETCH_INITIAL_NOITICE_FAILURE";

export const fetchInitialNoticeAsync = createAsyncAction(
  FETCH_INITIAL_NOTICE_REQUEST,
  FETCH_INITIAL_NOTICE_SUCCESS,
  FETCH_INITIAL_NOITICE_FAILURE
)<FetchInitialNoticePayload, FetchInitialNoticeSuccessPayload | null, string>();
