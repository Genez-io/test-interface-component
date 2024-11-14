// NavLinkStyled.tsx
import styled from "styled-components";
import { NavLink } from "react-router-dom";

// Define a styled component for the NavLink
const StyledNavLink = styled(NavLink)<{ isActive: boolean; grey?: boolean }>`
  color: ${({ theme }) => theme.colors.grey300};
  border: 1px solid transparent;
  text-decoration: none;
  font-weight: bold;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  padding: 0px 12px 0px 12px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    fill: ${({ theme }) => (theme.background === "#FFFFFF" ? "#1D1B20" : "#FAFAFA")};
    margin-right: 7px;
  }

  /* Apply styles based on isActive prop */
  ${({ isActive, theme, grey }) =>
    isActive &&
    !grey &&
    `
      background-color: ${theme.colors.purple200};
      border: 1px solid  ${theme.colors.purple300};
  `}

  ${({ grey, theme }) =>
    grey &&
    `
    background-color: ${theme.colors.grey500};
    border: 1px solid ${theme.colors.grey400};
`} /* &:hover { */
    /* color: ${(props) => (props.theme.background === "#FFFFFF" ? "green" : "purple")}; */
  /* } */
`;

export default StyledNavLink;
