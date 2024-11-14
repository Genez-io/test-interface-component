import React from "react";
import styled from "styled-components";
import ThemeSwitch from "../ThemeSwitch";

// Styled component for the Footer
const FooterWrapper = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  padding: 20px 30px;

  /* position: fixed; */
  left: 0;
  right: 0;
  bottom: 0;
  border-top: 1px solid ${({ theme }) => theme.colors.grey700};
  background-color: ${({ theme }) => theme.background};
  p,
  a {
    color: ${({ theme }) => theme.colors.grey600};
    font-size: 12px;
  }
  .links {
    margin-left: 40px;

    a {
      text-decoration: none;
      margin-left: 40px;
    }
  }
`;

// Footer Component
const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <div className="d-flex align-items-center">
        <p>Copyright ©️ 2024 Genezio. All rights reserved</p>
        <div className="links">
          <a href="https://genezio.com/eula" target="_blank" rel="noopener noreferrer">
            Legal
          </a>
          <a href="https://discord.gg/uc9H5YKjXv" target="_blank" rel="noopener noreferrer">
            Discord Community
          </a>
          <a href="https://x.com/geneziodev" target="_blank" rel="noopener noreferrer">
            X (formerly Twitter)
          </a>
          <a href="https://genezio.com/docs/" target="_blank" rel="noopener noreferrer">
            Documentation
          </a>
        </div>
      </div>

      <ThemeSwitch />
    </FooterWrapper>
  );
};

export default Footer;
