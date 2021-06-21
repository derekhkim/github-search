import {
  actions,
  fetchRepositories,
  getLanguage,
  getRepositories,
  getSearch,
  githubSearchName,
  initialState,
  reducer,
} from "./duck";
import { call, put, select } from "redux-saga/effects";

import { searchRepositories } from "../../common/api";

jest.mock("axios");

describe("Search redux functions", () => {
  // ACTIONS + REDUCERS
  it("initializes state", () => {
    const initializedState = reducer(undefined, {
      type: "FAKE_ACTION",
    });

    expect(initializedState).toEqual(initialState);
  });

  it("updates search value in store", () => {
    const action = { type: actions.updateSearch };
    const payload = "test search string";

    const expectedState = {
      ...initialState,
      query: payload,
    };

    expect(reducer).toReduce(
      undefined,
      { ...action, payload: payload },
      expectedState
    );
  });

  it("updates language value in store", () => {
    const action = { type: actions.updateLanguage };
    const payload = "test language";

    const expectedState = {
      ...initialState,
      language: payload,
    };

    expect(reducer).toReduce(
      undefined,
      { ...action, payload: payload },
      expectedState
    );
  });

  it("updates repositories in store on search success", () => {
    const action = { type: actions.searchSuccess };
    const payload = [
      {
        id: 0,
        html_url: "test-url-0",
        name: "test-name-0",
        description: "test-description-0",
        owner: {
          avatar_url: "test-avatar-0",
        },
      },
      {
        id: 1,
        html_url: "test-url-1",
        name: "test-name-1",
        description: "test-description-1",
        owner: {
          avatar_url: "test-avatar-1",
        },
      },
    ];

    const expectedState = {
      ...initialState,
      repositories: payload,
    };

    expect(reducer).toReduce(
      undefined,
      { ...action, payload: payload },
      expectedState
    );
  });

  it("clears repositories in store on search failure", () => {
    const action = { type: actions.searchFailed };
    const payload = [
      {
        id: 0,
        html_url: "test-url-0",
        name: "test-name-0",
        description: "test-description-0",
        owner: {
          avatar_url: "test-avatar-0",
        },
      },
    ];

    const initializedState = {
      ...initialState,
      repositories: payload,
    };

    const expectedState = {
      ...initialState,
    };

    expect(reducer).toReduce(
      initializedState,
      { ...action, payload: payload },
      expectedState
    );
  });

  it("clears repositories in store via clear action", () => {
    const action = { type: actions.clearRepositories };
    const payload = [
      {
        id: 0,
        html_url: "test-url-0",
        name: "test-name-0",
        description: "test-description-0",
        owner: {
          avatar_url: "test-avatar-0",
        },
      },
    ];

    const initializedState = {
      ...initialState,
      repositories: payload,
    };

    const expectedState = {
      ...initialState,
    };

    expect(reducer).toReduce(
      initializedState,
      { ...action, payload: payload },
      expectedState
    );
  });

  // SELECTORS
  it("gets search string from selector", () => {
    const payload = "test search string";

    const state = {
      githubSearch: {
        ...initialState,
        query: payload,
      },
    };

    expect(getSearch(state)).toEqual(payload);
  });

  it("gets language from selector", () => {
    const payload = "test language";

    const state = {
      githubSearch: {
        ...initialState,
        language: payload,
      },
    };

    expect(getLanguage(state)).toEqual(payload);
  });

  it("gets repositories from selector", () => {
    const payload = [
      {
        id: 0,
        html_url: "test-url-0",
        name: "test-name-0",
        description: "test-description-0",
        owner: {
          avatar_url: "test-avatar-0",
        },
      },
      {
        id: 1,
        html_url: "test-url-1",
        name: "test-name-1",
        description: "test-description-1",
        owner: {
          avatar_url: "test-avatar-1",
        },
      },
    ];

    const state = {
      githubSearch: {
        ...initialState,
        repositories: payload,
      },
    };

    expect(getRepositories(state)).toEqual(payload);
  });

  // SAGAS
  it("uses fetchRepositories saga to call searchRepositories correctly", () => {
    const mockSearch = "test search";
    const mockLanguage = "test language";

    const generator = fetchRepositories();

    expect(generator.next().value).toEqual(select(getSearch));
    expect(generator.next(mockSearch).value).toEqual(select(getLanguage));
    expect(generator.next(mockLanguage).value).toEqual(
      call(searchRepositories, mockSearch, mockLanguage)
    );
  });

  it("uses fetchRepositories saga to shortcut to clearRepositories", () => {
    const generator = fetchRepositories();

    expect(generator.next().value).toEqual(select(getSearch));
    expect(generator.next().value).toEqual(select(getLanguage));
    expect(generator.next().value).toEqual(
      put({ type: githubSearchName + "/clearRepositories" })
    );
  });
});
