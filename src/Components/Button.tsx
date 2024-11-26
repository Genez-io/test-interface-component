// Button.tsx
import styled from "styled-components";
import React from "react";
import { Theme } from "../theme/theme";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: keyof Theme["colors"];
  ref?: React.Ref<HTMLButtonElement>;
  icon?: React.ReactNode;
  size?: "sm";
  disabled?: boolean;
  noIconFill?: boolean;
  active?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  background-color: ${({ theme, variant }) => {
    return theme.colors[variant];
  }};
  border: none;
  padding: 8px 12px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  font-size: 14px;
  font-weight: 500;
  border-radius: 8px;
  display: inline-flex; // Use flexbox to align items
  align-items: center; // Center items vertically
  gap: 8px; // Space between icon and text
  transition: background-color 0.3s ease;
  outline: none;
  svg {
    fill: ${({ theme }) => theme.color};
  }

  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};

  ${({ theme, variant }) => {
    return `
      color:  ${variant === "darkPurple300" ? "white" : theme.background === "#111111" ? "#F8F1FF" : "#000000"};
    `;
  }}

  &:hover {
    background-color: ${({ theme, variant, disabled }) =>
      variant === "grey500" || variant === "grey600"
        ? theme?.background === "#FFFFFF"
          ? "#dedede"
          : "#353434"
        : variant === "darkPurple300"
          ? "#6D2BAB"
          : disabled
            ? theme.colors[variant]
            : theme.colors.purple500};
  }

  // Optional: You can add styles for other sizes if needed
  ${({ size }) => {
    switch (size) {
      case "sm":
        return `
          height: 32px; // Small button height
        `;

      default:
        return "";
    }
  }}
`;

const Button: React.FC<ButtonProps> = ({ variant, icon, children, disabled, ...props }) => {
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if (props.onClick) {
      props.onClick(e);
    }
  };

  return (
    <StyledButton variant={variant} disabled={disabled} onClick={onClick} {...props}>
      {icon && icon} {/* Render the icon if provided */}
      {children}
    </StyledButton>
  );
};

export default Button;
