import Select, { ValueType } from "react-select";

import { LANGUAGES } from "../../common/languages";
import { actions } from "./duck";
import { useDispatch } from "react-redux";

export const languageSelectId = "language-select";

type OptionType = {
  value: string;
  label: string;
};

export const options: OptionType[] = Object.keys(LANGUAGES).map((entry) => ({
  value: entry,
  label: entry,
}));

const LanguageSelect: React.FC = () => {
  const dispatch = useDispatch();

  const selectChangeHandler = (option: ValueType<OptionType, false>) => {
    if (option?.value) {
      dispatch(actions.updateLanguage(option.value));
    } else {
      dispatch(actions.updateLanguage(undefined));
    }
  };

  return (
    <Select
      aria-label={languageSelectId}
      isClearable
      onChange={selectChangeHandler}
      options={options}
      role="input"
    />
  );
};

export default LanguageSelect;
