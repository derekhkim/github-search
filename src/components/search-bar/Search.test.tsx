import { Provider } from "react-redux";
import Search from "./Search";
import { languageSelectId } from "./LanguageSelect";
import { render } from "@testing-library/react";
import { searchInputId } from "./SearchInput";
import store from "../../redux/store";

const ConnectedSearch = () => {
  return (
    <Provider store={store}>
      <Search />
    </Provider>
  );
};

describe("Search component", () => {
  it("renders with correct config", () => {
    const { getByTestId } = render(<ConnectedSearch />);

    getByTestId(searchInputId);
    getByTestId(languageSelectId);
  });
});
