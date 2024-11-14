import React from "react";
import styled from "styled-components";
import { pxToRem } from "../types/Utils";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

// Styled component that adapts to the specified tag
const StyledText = styled.span<{ fontSize?: string; color?: string; margin?: string }>`
  /* font-size: ${(props) => (props.fontSize ? pxToRem(props.fontSize) : "1rem")}; */
  ${(props) => props.fontSize && `font-size: ${pxToRem(props.fontSize)};`}
  color: ${({ theme }) => theme.color};
  text-decoration: none;
`;

// Define the props for the Text component
interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as: React.ElementType; // Element type (h1, h2, p, etc.)
  href?: string; // Element type (h1, h2, p, etc.)
  target?: string; // Element type (h1, h2, p, etc.)
  fontSize?: string; // Optional font size
  color?: string; // Optional color
  margin?: string; // Optional margin
  isLoading?: boolean; // Optional loading
}

// Loading state loading
const StyledSkeleton = styled(Skeleton)`
  margin: 8px;
  height: 16px;
  max-width: 165px;
  width: 100%;
`;

// Main Text Component
const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ isLoading, target, href, as, children, fontSize, color, margin, ...rest }, ref) => {
    if (isLoading) return <StyledSkeleton {...rest} />;

    return (
      <StyledText
        href={href}
        target={target}
        as={as}
        fontSize={fontSize}
        color={color}
        margin={margin}
        ref={ref}
        {...rest}
      >
        {children}
      </StyledText>
    );
  },
);

Text.displayName = "Text"; // For better debugging in React DevTools

export default Text;
