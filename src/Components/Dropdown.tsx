import * as RadixDropdown from "@radix-ui/react-dropdown-menu";
import styled from "styled-components";

interface ItemProps {
  variant?: "default" | "danger";
  disabled?: boolean;
}

const Menu = styled(RadixDropdown.Root)``;
const Trigger = styled(RadixDropdown.Trigger)`
  border: none;
  display: inline-flex;
  align-items: center;
  background-color: transparent;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const Content = styled(RadixDropdown.Content)`
  min-width: 195px;
  background-color: ${({ theme }) => theme.colors.black300};
  border: 1px solid ${({ theme }) => theme.colors.grey400};
  border-radius: 8px;
  overflow: hidden;
`;

const Item = styled(RadixDropdown.Item)<ItemProps>`
  display: flex;
  align-items: center;
  text-align: left;
  padding: 13.5px 10px;
  font-size: 14px;
  color: ${({ theme, variant, disabled }) =>
    disabled ? theme.colors.grey400 : variant === "danger" ? theme.colors.red : theme.color};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey400};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  outline: none;

  &:last-child {
    border-bottom: none;
  }

  /* Disable onClick if the item is disabled */
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
`;

const Portal = styled(RadixDropdown.Portal)``;

const Dropdown = {
  Menu,
  Trigger,
  Content,
  Item,
  Portal,
};

export default Dropdown;
