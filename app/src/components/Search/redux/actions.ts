import { createAsyncAction } from "typesafe-actions";
import { SearchNoticeRequestPayload, SearchNoticeSuccessPayload } from "./types";

export const SEARCH_NOTICE_REQUEST = "SEARCH_NOTICE_REQUEST";
export const SEARCH_NOTICE_SUCCESS = "SEARCH_NOTICE_SUCCESS";
export const SEARCH_NOTICE_FAILURE = "SEARCH_NOTICE_FAILURE";

export const searchNoticeAsync = createAsyncAction(SEARCH_NOTICE_REQUEST, SEARCH_NOTICE_SUCCESS, SEARCH_NOTICE_FAILURE)<
  SearchNoticeRequestPayload,
  SearchNoticeSuccessPayload | null,
  string
>();
