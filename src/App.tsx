import CardList from "./components/card-list";
import { Provider } from "react-redux";
import Search from "./components/search-bar";
import store from "./redux/store";
import styled from "@emotion/styled";

const App: React.FC = () => {
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
  margin: "10px",
});

export default App;
