import styled from 'styled-components';

export const MainContent = styled.main`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  align-items: start;
  justify-items: center;
  gap: 2vw;
  margin: clamp(0.25rem, 2vw, 2rem);
`;
