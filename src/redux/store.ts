import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { persistStore, persistReducer } from "redux-persist";
import rootReducer from "./reducer";
import { RootState } from "./types";
import AsyncStorage from "@react-native-community/async-storage";

export default function createReduxStore(preloadedState?: RootState) {
  const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ["department"],
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  let store = createStore(
    persistedReducer,
    preloadedState,
    composeWithDevTools()
  );
  // @ts-expect-error "Type 'AnyAction' is not assignable to type 'PayloadAction<"SET_FAVORITE_DEPARTMENT", string[]>'.ts(2345)"
  let persistor = persistStore(store);
  return { store, persistor };
}
