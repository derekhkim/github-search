import PropTypes from "prop-types";
import styled from "@emotion/styled";

type DropdownProps = {
  children?: React.ReactNode;
  id?: string;
};

const Dropdown: React.FC<DropdownProps> = ({ children, id }) => {
  return <Select id={id}>{children}</Select>;
};

Dropdown.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
};

// STYLES
const Select = styled.select({});

export default Dropdown;
