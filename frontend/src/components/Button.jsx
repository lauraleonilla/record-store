import React from 'react';
import styled from 'styled-components';

export const Button = ({ text, onClick, disabled }) => {
  return (
    <StyledButton disabled={disabled} onClick={onClick}>
      {text}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  background-color: ${(props) => (props.disabled ? props.theme.grey : props.theme.orange)};
  color: ${(props) => (props.disabled ? props.theme.white : props.theme.black)};
  font-weight: bold;
  border-radius: 5px;
  border: none;
  padding: 10px 20px;
  cursor: ${(props) => (props.disabled ? 'auto' : 'pointer')};
  margin: 10px auto;
`;
