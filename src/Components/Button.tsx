// Button.tsx
import styled from "styled-components";
import React from "react";
import { Theme } from "../theme/theme";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: keyof Theme["colors"];
  hoverVariant?: keyof Theme["colors"];
  textVariant?: keyof Theme["colors"];
  hoverTextVariant?: keyof Theme["colors"];
  disabledTextVariant?: keyof Theme["colors"];
  disabledVariant?: keyof Theme["colors"];
  ref?: React.Ref<HTMLButtonElement>;
  icon?: React.ReactNode;
  size?: "sm";
  disabled?: boolean;
  noIconFill?: boolean;
  active?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  background-color: ${({ theme, variant, disabled, disabledVariant }) =>
    disabled ? (disabledVariant ? theme.colors[disabledVariant] : theme.colors.grey500) : theme.colors[variant]};
  border: none;
  padding: 8px 12px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  font-size: 14px;
  font-weight: 500;
  border-radius: 8px;
  color: ${({ theme, textVariant, disabledTextVariant, disabled }) =>
    disabled
      ? disabledTextVariant
        ? theme.colors[disabledTextVariant]
        : theme.colors.grey800
      : textVariant
        ? theme.colors[textVariant]
        : theme.color.black300};
  display: inline-flex; // Use flexbox to align items
  align-items: center; // Center items vertically
  justify-content: center; // Center items horizontally
  gap: 8px; // Space between icon and text
  transition: background-color 0.3s ease;
  outline: none;
  svg {
    fill: ${({ theme }) => theme.color};
  }

  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};

  &:hover {
    background-color: ${({ theme, variant, disabled, disabledVariant, hoverVariant }) =>
      disabled
        ? disabledVariant
          ? theme.colors[disabledVariant]
          : theme.colors.grey500
        : hoverVariant
          ? theme.colors[hoverVariant]
          : theme.colors[variant]};

    color: ${({ theme, hoverTextVariant, disabled, disabledTextVariant }) =>
      disabled
        ? disabledTextVariant
          ? theme.colors[disabledTextVariant]
          : theme.color.grey800
        : hoverTextVariant
          ? theme.colors[hoverTextVariant]
          : theme.color.black300};
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
