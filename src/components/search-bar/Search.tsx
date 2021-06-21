import { ChangeEventHandler } from "react";
import Dropdown from "./Dropdown";
import { LANGUAGES } from "../../common/languages";
import { actions } from "./duck";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";

const Search: React.VFC = () => {
  const dispatch = useDispatch();

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(actions.updateSearch(e.target.value));
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        id="search"
        autoFocus
        aria-label="search"
        placeholder="Search Repositories"
        onChange={onChangeHandler}
        name="s"
      />
      <StyledDropdown>
        {Object.keys(LANGUAGES).map((item) => (
          <option key={item}>{item}</option>
        ))}
      </StyledDropdown>
      <SearchButton type="submit">Search</SearchButton>
    </SearchContainer>
  );
};

// STYLES
const SearchContainer = styled.div({
  display: "block",
});

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

const StyledDropdown = styled(Dropdown)({
  padding: "10px 20px",
  border: "solid 2px #005ad8",
  borderRadius: "5px",
  marginRight: "5px",
  outline: "none",
});

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
