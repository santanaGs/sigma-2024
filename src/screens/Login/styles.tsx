import styled from "styled-components";

export const Background = styled.div`
  background: rgb(11, 74, 80);
  background: -moz-linear-gradient(
    90deg,
    rgba(11, 74, 80, 1) 0%,
    rgba(68, 161, 160, 1) 0B4A50%
  );
  background: -webkit-linear-gradient(
    90deg,
    rgba(11, 74, 80, 1) 0%,
    rgba(68, 161, 160, 1) 0B4A50%
  );
  background: linear-gradient(
    90deg,
    rgba(11, 74, 80, 1) 0%,
    rgba(68, 161, 160, 1) 0B4A50%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#0b4a50",endColorstr="#44a1a0",GradientType=1);
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.form`
  width: 40rem;
  height: auto;
  border-radius: 1.25rem;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 3rem 0;
`;

export const Submit = styled.input`
  cursor: pointer;
  background-color: #0b4a50;
  padding: 1rem;
  width: 320px;
  border-radius: 1rem;
  border: 1px solid transparent;
  font-weight: bold;
  font-size: 1.5rem;
  color: #fff;
  transition: 0.3s;

  &:hover {
    background-color: transparent;
    border: 1px solid #0b4a50;
    color: #0b4a50;
  }
`;
