import styled from "styled-components";

export const Container = styled.div`
  background: #101813;
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px 0px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ErrorMessage = styled.span`
  position: absolute;
  bottom: 35px;
  color: #9f3a3a;
  font-size: 12px;
`;
