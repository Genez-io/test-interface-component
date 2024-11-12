// Card.js
import styled from "styled-components";

const Card = styled.div`
  ${({ theme }) => {
    return `
      background-color: ${theme.colors.black300};
      border:1px solid ${theme.colors.grey600};
      position: relative;
      display: flex;
      flex-direction: column;
      border-radius: 8px;
      margin-bottom: 1.3rem;
      word-wrap: break-word;
      box-shadow: 1px 1px 7px #9a9acc1a;
    `;
  }}
`;

export default Card;
