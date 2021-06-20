import { ChangeEventHandler } from "react";
import { actions } from "./duck";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";

const Search: React.VFC = () => {
  const dispatch = useDispatch();

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(actions.updateSearch(e.target.value));
  };

  return (
    <form action="/" method="get">
      <SearchInput
        type="text"
        id="search"
        aria-label="search"
        placeholder="Search GitHub Repositories"
        onChange={onChangeHandler}
        name="s"
      />
      <SearchButton type="submit">Search</SearchButton>
    </form>
  );
};

// STYLES
const SearchInput = styled.input`
  padding: 10px 20px;
  border: solid 2px #686868;
  border-radius: 5px;
  margin-right: 5px;
  outline: none;
  &:focus {
    border-color: #005ad8;
    transition: 0.5s;
  }
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  border: solid 2px #005ad8;
  border-radius: 5px;
  background-color: #005ad8;
  color: white;
  outline: none;
  cursor: pointer;
`;

export default Search;
