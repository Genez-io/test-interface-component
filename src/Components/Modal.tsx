import React, { ReactNode, useEffect } from "react";
import styled from "styled-components";
import { useSpring, animated } from "@react-spring/web";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const AnimatedModalContainer = styled(animated.div)`
  background-color: ${({ theme }) => theme.colors.grey200};
  border-radius: 8px;
  padding: 20px;
  width: 100%;
  max-width: 600px;
  position: relative;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  transform-origin: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Animation configuration
  const animation = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? "scale(1)" : "scale(0.9)",
    config: { tension: 300, friction: 25 },
  });

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <AnimatedModalContainer style={animation} onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        {children}
      </AnimatedModalContainer>
    </Overlay>
  );
};

export default Modal;
