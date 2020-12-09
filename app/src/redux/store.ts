import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import rootReducer from "./reducer";
import rootSaga from "./saga";
import { RootState } from "./types";
import ExpoFileSystemStorage from "redux-persist-expo-filesystem";
import { persistStore, persistReducer } from "redux-persist";
import createSagaMiddleware from "redux-saga";

const persistConfig = {
  key: "root",
  storage: ExpoFileSystemStorage,
  whitelist: ["department", "article"],
};

const sagaMiddleware = createSagaMiddleware();

export default function createReduxStore(preloadedState?: RootState) {
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(
    persistedReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );
  sagaMiddleware.run(rootSaga);
  // @ts-expect-error "Type 'AnyAction' is not assignable to type 'PayloadAction<"SET_FAVORITE_DEPARTMENT", string[]>'.ts(2345)"
  let persistor = persistStore(store);
  return { store, persistor };
}
