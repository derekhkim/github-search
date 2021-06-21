import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";

import { AnyAction, Reducer } from "@reduxjs/toolkit";

import { configure } from "@testing-library/react";

expect.extend({
  toReduce<State>(
    reducer: Reducer<State>,
    initialState: State,
    action: AnyAction,
    expectedState: State
  ) {
    const updatedState = reducer(initialState, action);

    expect(updatedState).toEqual(expectedState);
    return {
      pass: true,
      message: () => `Updated state is equivalent to expected state`,
    };
  },
});

configure({ testIdAttribute: "aria-label" });
