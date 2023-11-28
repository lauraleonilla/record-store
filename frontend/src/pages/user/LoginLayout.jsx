import styled from 'styled-components';
import { MainContent } from '../../components/MainContent';
import { Outlet } from 'react-router-dom';

export function LoginLayout() {
  return (
    <MainContent>
      <FormWrapper>
        <Outlet />
      </FormWrapper>
    </MainContent>
  );
}

const FormWrapper = styled.div`
  grid-area: 1 / 2 / 2 / 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  padding: 3rem clamp(1rem, 4vw, 4rem);
  gap: 2rem;
  background: ${(props) => props.theme.lightGrey};
  box-shadow: ${(props) => props.theme.shadows.smallAroundDark};
`;
