import { createAsyncAction } from "typesafe-actions";
import {
  storeLocalStorageRequestPayload,
  deleteLocalStorageRequestPayload,
  LocalStorageDataType,
  LocalStorageData,
} from "./types";

export const STORE_LOCAL_STORAGE_REQUEST = "STORE_LOCAL_STORAGE_REQUEST";
export const STORE_LOCAL_STORAGE_SUCCESS = "STORE_LOCAL_STORAGE_SUCCESS";
export const STORE_LOCAL_STORAGE_FAILURE = "STORE_LOCAL_STORAGE_FAILURE";

export const GET_LOCAL_STORAGE_REQUEST = "GET_LOCAL_STORAGE_REQUEST";
export const GET_LOCAL_STORAGE_SUCCESS = "GET_LOCAL_STORAGE_SUCCESS";
export const GET_LOCAL_STORAGE_FAILURE = "GET_LOCAL_STORAGE_FAILURE";

export const DELETE_LOCAL_STORAGE_REQUEST = "DELETE_LOCAL_STORAGE_REQUEST";
export const DELETE_LOCAL_STORAGE_SUCCESS = "DELETE_LOCAL_STORAGE_SUCCESS";
export const DELETE_LOCAL_STORAGE_FAILURE = "DELETE_LOCAL_STORAGE_FAILURE";

export const storeLocalStorageAsync = createAsyncAction(
  STORE_LOCAL_STORAGE_REQUEST,
  STORE_LOCAL_STORAGE_SUCCESS,
  STORE_LOCAL_STORAGE_FAILURE
)<storeLocalStorageRequestPayload, string, string>();

export const getLocalStorageAsync = createAsyncAction(
  GET_LOCAL_STORAGE_REQUEST,
  GET_LOCAL_STORAGE_SUCCESS,
  GET_LOCAL_STORAGE_FAILURE
)<LocalStorageDataType, LocalStorageData, string>();

export const deleteLocalStorageAsync = createAsyncAction(
  DELETE_LOCAL_STORAGE_REQUEST,
  DELETE_LOCAL_STORAGE_SUCCESS,
  DELETE_LOCAL_STORAGE_FAILURE
)<deleteLocalStorageRequestPayload, string, string>();
