import styled from 'styled-components';

export const FormInput = ({ description, value, onChange, onBlur, name }) => {
  return (
    <InputContainer>
      <p>{description}</p>
      <Input value={value} onChange={onChange} onBlur={onBlur} name={name} />
    </InputContainer>
  );
};

const Input = styled.input`
  width: 300px;
  height: 30px;
  border: 1px solid ${(props) => props.theme.grey};
  border-radius: 4px;
  padding-left: 5px;
`;

const InputContainer = styled.div`
  margin-bottom: 20px;
`;
