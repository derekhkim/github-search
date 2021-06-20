import {
  ForkEffect,
  SagaReturnType,
  StrictEffect,
  call,
  put,
  throttle,
} from "redux-saga/effects";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RepositoryData, SearchState } from "../../common/types";

import { searchRepositories } from "../../common/api";

type SearchRespositoriesResponse = SagaReturnType<typeof searchRepositories>;

const initialState: SearchState = { query: "", repositories: [] };
const throttleTime = 500;

export const githubSearchName = "githubSearch";

// SELECTORS

export const getRepositories = (state: {
  githubSearch: SearchState;
}): RepositoryData[] => state.githubSearch.repositories;

// SAGAS

/**
 * Our worker Saga: makes a GET request to github v5 API
 * @param {string} value the search input value
 */
function* handleUpdateSearch(
  value: PayloadAction<string>
): Generator<StrictEffect> {
  console.log(value);
  const { payload } = value;
  try {
    const { data } = (yield call(
      searchRepositories,
      payload
    )) as SearchRespositoriesResponse;

    yield put({
      type: githubSearchName + "/searchSuccess",
      payload: data.items,
    });
  } catch (e) {
    yield put({
      type: githubSearchName + "/searchFailed",
      message: e.message,
    });
  }
}

/**
 * Our watcher Saga: spawn a new handleUpdateSearch task on each updateSearch
 */
export function* watchUpdateSearch(): Generator<ForkEffect<never>> {
  yield throttle(throttleTime, actions.updateSearch, handleUpdateSearch);
}

// ACTIONS + REDUCERS

export const { reducer, actions } = createSlice({
  name: githubSearchName,
  initialState,
  reducers: {
    updateSearch: (state, action: PayloadAction<string>) => {
      state.query = action.payload;

      return state;
    },
    searchSuccess: (state, action: PayloadAction<RepositoryData[]>) => {
      state.repositories = action.payload;

      return state;
    },
  },
});
