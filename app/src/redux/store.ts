import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import rootReducer from "./reducer";
import rootSaga from "./saga";
import { RootState } from "./types";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();

export default function createReduxStore(preloadedState?: RootState) {
  const store = createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );
  sagaMiddleware.run(rootSaga);
  return store;
}
