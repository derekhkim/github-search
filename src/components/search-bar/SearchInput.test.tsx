import SearchInput, { searchInputId } from "./SearchInput";
import { fireEvent, render } from "@testing-library/react";

import { Provider } from "react-redux";
import { actions } from "./duck";
import store from "../../redux/store";

const ConnectedSearchInput = () => {
  return (
    <Provider store={store}>
      <SearchInput />
    </Provider>
  );
};

describe("SearchInput component", () => {
  it("renders with correct config", () => {
    const { getByTestId } = render(<ConnectedSearchInput />);

    getByTestId(searchInputId);
  });

  it("is autofocused when rendered", () => {
    const { getByTestId } = render(<ConnectedSearchInput />);

    const search = getByTestId(searchInputId);

    expect(document.activeElement).toEqual(search);
  });

  it("calls updateSearch on changeEvent", () => {
    const { getByTestId } = render(<ConnectedSearchInput />);

    const spy = jest.spyOn(actions, "updateSearch");

    const input = getByTestId(searchInputId);

    fireEvent.change(input, { target: { value: "test" } });
    expect(spy).toHaveBeenCalled;
  });
});
