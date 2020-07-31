import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import rootReducer from "./reducer";
import { RootState } from "./types";

export function createReduxStore(preloadedState?: RootState) {
  const store = createStore(rootReducer, preloadedState, composeWithDevTools());
  return store;
}
