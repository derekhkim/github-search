import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import CardList from "./components/card-list";
import { Provider } from "react-redux";
import Search from "./components/search-bar";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducer/reducer";
import styled from "@emotion/styled";
import { watchUpdateSearch } from "./components/search-bar";

const App: React.FC = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware(), sagaMiddleware],
  });
  sagaMiddleware.run(watchUpdateSearch);

  return (
    <Provider store={store}>
      <AppContainer>
        <Search />
        <CardList />
      </AppContainer>
    </Provider>
  );
};

const AppContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export default App;
