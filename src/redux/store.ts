import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {
  watchUpdateLanguage,
  watchUpdateSearch,
} from "../components/search-bar";

import { all } from "redux-saga/effects";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducer";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), sagaMiddleware],
});

/**
 * A root Saga to aggregate our Sagas to a single entry point for the sagaMiddleware to run.
 */
function* rootSaga() {
  yield all([watchUpdateSearch(), watchUpdateLanguage()]);
}

sagaMiddleware.run(rootSaga);

export default store;
