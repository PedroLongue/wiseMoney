import styled from "styled-components";

export const Container = styled.div`
  background: #101813;
  height: calc(100vh - 49px);
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const LoginTitle = styled.h1`
  color: #2e623e;
  font-size: 24px;
`;
export const LoginSubtitle = styled.h1`
  color: #000;
  font-size: 16px;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px 0px;
`;

export const LoginText = styled.span`
  font-size: 16px;
  color: #2a382f;
  font-weight: bold;
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
