import LanguageSelect, { languageSelectId, options } from "./LanguageSelect";
import { fireEvent, render } from "@testing-library/react";

import { Provider } from "react-redux";
import { actions } from "./duck";
import store from "../../redux/store";

const ConnectedLanguageSelect = () => {
  return (
    <Provider store={store}>
      <LanguageSelect />
    </Provider>
  );
};

describe("LanguageSelect component", () => {
  it("renders with correct config", () => {
    const { getByTestId } = render(<ConnectedLanguageSelect />);

    getByTestId(languageSelectId);
  });

  it("languages list formatted correctly", () => {
    const javaOption = {
      value: "Java",
      label: "Java",
    };

    expect(options.find((option) => option.value === "Java")).toEqual(
      javaOption
    );

    expect(options.find((option) => option.label === "Java")).toEqual(
      javaOption
    );
  });

  it("calls updateLanguage on changeEvent", () => {
    const { getByTestId } = render(<ConnectedLanguageSelect />);

    const spy = jest.spyOn(actions, "updateLanguage");

    const input = getByTestId(languageSelectId);

    fireEvent.change(input, { value: "Java", label: "Java" });
    expect(spy).toHaveBeenCalled;
  });
});
