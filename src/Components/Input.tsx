import React from "react";
import styled from "styled-components";

interface StyledInputProps {
  placeholder?: string;
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  type?: string;
  icon?: React.ReactNode; // Add an icon prop
  disabled?: boolean;
}

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.grey700};
  border-radius: 8px;
  background-color: transparent;
  padding: 1px;

  &:hover {
    border-color: #666666;
  }

  &:focus-within {
    border-width: 2px;
    padding: 0px;
    border-color: ${({ theme }) => theme.colors.grey800};
  }
`;

const IconWrapper = styled.div`
  padding: 10px;
  padding: 10px 0px 10px 12px;
  svg {
    fill: ${({ theme }) => theme.colors.grey700}; // Adjust color as needed
    width: 16px; // Adjust icon size
    height: 16px; // Adjust icon size
  }
`;

const InputField = styled.input<{ hasError?: boolean }>`
  flex: 1; // Allow the input to grow
  padding: 10px;
  color: ${({ theme }) => theme.color};
  border: none; // Remove border, handled by InputWrapper
  background-color: transparent;
  font-size: 16px;

  caret-color: ${({ theme }) => theme.color};

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #aaa;
  }

  &::placeholder {
    font-weight: 500;
    font-size: 14px;
  }
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-size: 14px;
`;

const StyledInput: React.FC<StyledInputProps> = ({
  placeholder,
  label,
  value,
  onChange,
  onPaste,
  type = "text",
  icon,
  disabled,
}) => {
  return (
    <InputContainer>
      {label && <Label>{label}</Label>}
      <InputWrapper>
        {icon && <IconWrapper>{icon}</IconWrapper>}
        <InputField
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onPaste={onPaste}
          disabled={disabled}
        />
      </InputWrapper>
    </InputContainer>
  );
};

export default StyledInput;
