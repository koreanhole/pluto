import { RootState } from "redux/types";

export const getNoticeFetchState = (state: RootState) =>
  state.home.intialNoticeFetchState;

export const getInitialNotice = (state: RootState) => state.home.initialNotice;
