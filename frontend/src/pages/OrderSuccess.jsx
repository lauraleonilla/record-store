import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';

export const OrderSuccess = () => {
  const navigate = useNavigate();

  const onButtonClick = () => {
    navigate('/');
  };

  return (
    <SuccessContainer>
      <SuccessText>Tilauksesi on vastaanotettu!</SuccessText>
      <Button text={'Palaa tuotesivulle'} onClick={onButtonClick} />
    </SuccessContainer>
  );
};

const SuccessContainer = styled.div`
  background-color: ${(props) => props.theme.lightGrey};
  width: 40rem;
  height: 100%;
  padding: 50px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SuccessText = styled.h1`
  font-size: 40px;
  margin-bottom: 30px;
`;
