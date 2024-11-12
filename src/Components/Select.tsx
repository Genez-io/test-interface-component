import React from "react";
import Select, { StylesConfig, Props as SelectProps, DropdownIndicatorProps } from "react-select";

import styled, { useTheme, DefaultTheme } from "styled-components";
import { Theme } from "../theme/theme";

interface Option {
  label: string | React.ReactElement;
  value: string;
}

interface SelectorProps extends SelectProps<Option, false> {
  placeholder?: string;
  options: Option[];
  variant?: keyof Theme["colors"];
}

// Create the `customStyles` function to accept theme as an argument
const getCustomStyles = (theme: DefaultTheme, variant?: keyof Theme["colors"]): StylesConfig<Option, false> => ({
  control: (provided) => ({
    ...provided,
    outline: "none",
    background: variant ? theme.colors[variant] : theme.background,
    boxShadow: "none", // Remove blue outline
    borderRadius: "8px",
    borderColor: theme.colors.grey400,
    // width: "fit-content",
    color: theme.colors.red,
    "&:hover": {
      borderColor: theme.colors.grey400,
    },
  }),
  menu: (provided) => ({
    ...provided,
    outline: "none",
    background: theme.background,
    borderRadius: "8px",
    border: `1px solid ${theme.colors.grey400}`,
  }),
  option: (provided) => ({
    ...provided,
    padding: "12px 10px",
    fontSize: "14px",
    color: theme.color,
    cursor: "pointer",
    backgroundColor: "transparent",

    "&:hover": {
      backgroundColor: theme.colors.grey200,
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: theme.color,
  }),
  singleValue: (provided) => ({
    ...provided,
    color: theme.color,
  }),
});

// Custom Dropdown Indicator with a custom icon
const DropdownIndicator = (props: DropdownIndicatorProps<Option, false>) => {
  const theme = useTheme();
  const { menuIsOpen } = props.selectProps;
  return (
    <div
      style={{
        fill: theme.color,
        transition: "transform 0.2s ease",
        transform: menuIsOpen ? "rotate(180deg)" : "rotate(0deg)", // Rotate if menu is open
        marginRight: "13px",
        height: "5px",
        width: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width="10" height="5" viewBox="0 0 10 5" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 5L0 0H10L5 5Z" />
      </svg>
    </div>
  );
};

// Override components to remove the separator
const customComponents = {
  IndicatorSeparator: () => null, // Remove separator
  DropdownIndicator, // Use custom arrow icon
};

const StyledSelect = styled(Select)`
  width: 100%;
  font-family: inherit;
`;

const Selector: React.FC<SelectorProps> = ({ placeholder = "Select...", variant, options, ...props }) => {
  const theme = useTheme(); // Access theme

  return (
    <StyledSelect
      components={customComponents} // Pass custom components to remove separator
      styles={getCustomStyles(theme, variant)} // Pass the theme into customStyles
      placeholder={placeholder}
      options={options}
      {...props}
    />
  );
};

export default Selector;
