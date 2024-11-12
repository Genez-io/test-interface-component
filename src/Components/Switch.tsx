import React from "react";
import styled from "styled-components";

interface SwitchProps {
  isOn: boolean;
  handleToggle: () => void;
  disabled?: boolean;
}

const SwitchContainer = styled.div<{ isOn: boolean; disabled?: boolean }>`
  display: flex;
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  width: 52px;
  height: 32px;
  background-color: ${({ isOn, theme, disabled }) => (isOn ? theme.colors.green : theme.colors.grey700)};
  border-radius: 25px;
  padding: 3px;
  transition: background-color 0.3s;
  filter: ${({ isOn, disabled }) =>
    disabled ? (isOn ? "grayscale(30%) opacity(0.8)" : "grayscale(50%) opacity(0.6)") : "none"};
`;

const SwitchToggle = styled.div<{ isOn: boolean }>`
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.3s;
  transform: ${({ isOn }) => (isOn ? "translateX(25px)" : "translateX(0)")};
`;

const Switch: React.FC<SwitchProps> = ({ isOn, handleToggle, disabled = false }) => {
  const onClick = () => {
    if (!disabled) {
      handleToggle();
    }
  };

  return (
    <SwitchContainer onClick={onClick} isOn={isOn} disabled={disabled}>
      <SwitchToggle isOn={isOn} />
    </SwitchContainer>
  );
};

export default Switch;
