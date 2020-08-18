import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import rootReducer from "./reducer";
import { RootState } from "./types";

export default function createReduxStore(preloadedState?: RootState) {
  let store = createStore(rootReducer, preloadedState, composeWithDevTools());

  return store;
}
