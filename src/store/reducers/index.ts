import { combineReducers } from "redux";
import { fetchRepositoriesReducer } from "./fetchRepositoriesReducer";

export const rootReducer = combineReducers({
    fetchRepositoriesReducer,
})

export type RootState = ReturnType<typeof rootReducer>