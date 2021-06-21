import {
  githubSearchName,
  githubSearchReducer,
} from "../components/search-bar";

import { RootState } from "../common/types";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers<RootState>({
  [githubSearchName]: githubSearchReducer,
});

export default rootReducer;
