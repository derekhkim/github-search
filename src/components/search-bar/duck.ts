import {
  ForkEffect,
  SagaReturnType,
  StrictEffect,
  call,
  put,
  select,
  takeEvery,
  throttle,
} from "redux-saga/effects";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RepositoryData, SearchState } from "../../common/types";

import { searchRepositories } from "../../common/api";

type SearchRespositoriesResponse = SagaReturnType<typeof searchRepositories>;

export const initialState: SearchState = {
  query: "",
  language: "",
  repositories: [],
};
export const githubSearchName = "githubSearch";

const throttleTime = 500;

// SELECTORS

export const getSearch = (state: {
  githubSearch: SearchState;
}): string | undefined => state.githubSearch.query;

export const getLanguage = (state: {
  githubSearch: SearchState;
}): string | undefined => state.githubSearch.language;

export const getRepositories = (state: {
  githubSearch: SearchState;
}): RepositoryData[] | undefined => state.githubSearch.repositories;

// SAGAS

/**
 * Our worker Saga: makes a GET request to github v3 API using the search input
 * value and the language dropdown value.
 * Doesn't require any parms because the search query is built from selectors
 */
export function* fetchRepositories(): Generator<StrictEffect> {
  const search = (yield select(getSearch)) as string;
  const language = (yield select(getLanguage)) as string;

  if (search) {
    try {
      const { data } = (yield call(
        searchRepositories,
        search,
        language
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
  } else {
    yield put({
      type: githubSearchName + "/clearRepositories",
    });
  }
}

/**
 * Our watcher Saga: spawn a new fetchRepositories task on each updateSearch.
 * Uses throttle instead of takeEvery so the user has time to finish typing
 * their search string.
 */
export function* watchUpdateSearch(): Generator<ForkEffect<never>> {
  yield throttle(throttleTime, actions.updateSearch, fetchRepositories);
}

/**
 * Our watcher Saga: spawn a new fetchRepositories task on each updateLanguage.
 */
export function* watchUpdateLanguage(): Generator<ForkEffect<never>> {
  yield takeEvery(actions.updateLanguage, fetchRepositories);
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
    updateLanguage: (state, action: PayloadAction<string | undefined>) => {
      state.language = action.payload;

      return state;
    },
    searchSuccess: (state, action: PayloadAction<RepositoryData[]>) => {
      state.repositories = action.payload;

      return state;
    },
    searchFailed: (state) => {
      state.repositories = [];

      return state;
    },
    clearRepositories: (state) => {
      state.repositories = [];

      return state;
    },
  },
});
