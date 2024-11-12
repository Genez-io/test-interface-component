import React, { ReactNode } from "react";
import styled from "styled-components";
import { ExclamationMark } from "../assets/icons/exclamationMark";

// Styled Alert Component
const AlertContainer = styled.div`
  padding: 16px 10px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: medium;
  margin: 10px 0;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => (theme.color === "#000000" ? "#FAFAFA" : "#1A1A19")};
  border: 1px solid #2d2e2e;
`;

const AlertIcon = styled.span`
  font-size: 24px;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 24px;
    fill: ${({ theme }) => theme.colors.grey300};
  }
`;

const AlertText = styled.span`
  color: ${({ theme }) => theme.colors.grey300};
  flex: 1;
`;

interface AlertProps {
  children: ReactNode;
  className?: string;
}

// Main Alert Component
const Alert: React.FC<AlertProps> = ({ children, className }) => {
  return (
    <AlertContainer>
      <AlertIcon>
        <ExclamationMark />
      </AlertIcon>
      <AlertText className={className}>{children}</AlertText>
    </AlertContainer>
  );
};

export default Alert;
