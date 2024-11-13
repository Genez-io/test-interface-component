import styled from "styled-components";

const BtnClose = styled.div`
  box-sizing: content-box;
  width: 1em;
  height: 1em;
  padding: 0.25em 0.25em;
  background: transparent
    url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/%3e%3c/svg%3e")
    center/1em auto no-repeat;
  border: 0;
  border-radius: 0.25rem;
  line-height: 1;
  background-image: none;
  color: #000;
`;

const DivModal = styled.div`
  text-align: center;
  padding-left: 0.5rem !important;
  padding-right: 0.5rem !important;
`;

const IconModal = styled.div`
  font-size: 100px;
  color: #f34343;
  display: inline-block !important;
  line-height: 1 !important;
`;

const HeaderModal = styled.div`
  margin-bottom: 20px;
`;

const PModal = styled.div`
  margin-bottom: 20px;
  margin-left: 20px;
  margin-right: 20px;
`;

const ButtonContinueModal = styled.div`
  color: ${({ theme }) => theme.colors.black300};
  text-align: center;
  vertical-align: middle;
  user-select: none;
  line-height: 1.5;
`;

export { BtnClose, DivModal, IconModal, HeaderModal, PModal, ButtonContinueModal };
