// src/components/Grid/Col.tsx
import styled from "styled-components";

interface ColProps {
  xs?: number; // Extra small devices
  sm?: number; // Small devices
  md?: number; // Medium devices
  lg?: number; // Large devices
  xl?: number; // Extra large devices
  className?: string; // Accept custom class names
}

const Col = styled.div.attrs<ColProps>(({ className }) => ({
  className,
}))<ColProps>`
  /* Set default padding */
  padding-left: ${({ className }) => (className?.includes("px-0") ? "0px" : "15px")};
  padding-right: ${({ className }) => (className?.includes("px-0") ? "0px" : "15px")};

  /* Responsive column widths */
  ${({ xs }) => xs && `flex: 0 0 ${(xs / 12) * 100}%; max-width: ${(xs / 12) * 100}%;`}
  ${({ sm }) => sm && `@media (min-width: 576px) { flex: 0 0 ${(sm / 12) * 100}%; max-width: ${(sm / 12) * 100}%; }`}
  ${({ md }) => md && `@media (min-width: 768px) { flex: 0 0 ${(md / 12) * 100}%; max-width: ${(md / 12) * 100}%; }`}
  ${({ lg }) => lg && `@media (min-width: 992px) { flex: 0 0 ${(lg / 12) * 100}%; max-width: ${(lg / 12) * 100}%; }`}
  ${({ xl }) => xl && `@media (min-width: 1200px) { flex: 0 0 ${(xl / 12) * 100}%; max-width: ${(xl / 12) * 100}%; }`}
`;

export default Col;
