import { ActionType, StateType } from "typesafe-actions";
import rootAction from "./action";
import rootReducer from "./reducer";

export type RootAction = ActionType<typeof rootAction>;

export type RootState = StateType<typeof rootReducer>;
