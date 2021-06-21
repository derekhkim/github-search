import { ChangeEventHandler } from "react";
import { actions } from "./duck";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";

export const searchInputId = "search";
const placeholder = "Search Repositories";

const SearchInput: React.VFC = () => {
  const dispatch = useDispatch();

  const inputChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(actions.updateSearch(e.target.value));
  };

  return (
    <Input
      aria-label={searchInputId}
      autoFocus
      id={searchInputId}
      onChange={inputChangeHandler}
      placeholder={placeholder}
      type="text"
    />
  );
};

const Input = styled.input({
  padding: "2px 8px",
  borderRadius: "5px",
  marginRight: "5px",
});

export default SearchInput;
