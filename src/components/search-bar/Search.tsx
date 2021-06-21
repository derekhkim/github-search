import LanguageSelect from "./LanguageSelect";
import SearchInput from "./SearchInput";
import styled from "@emotion/styled";

const Search: React.VFC = () => {
  return (
    <SearchContainer>
      <SearchInput />
      <LanguageSelectContainer>
        <LanguageSelect />
      </LanguageSelectContainer>
    </SearchContainer>
  );
};

// STYLES
const SearchContainer = styled.div({
  display: "flex",
});

const LanguageSelectContainer = styled.div({
  width: "200px",
  marginRight: "5px",
});

export default Search;
