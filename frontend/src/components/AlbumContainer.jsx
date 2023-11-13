import styled from 'styled-components';

export const AlbumContainer = styled.div`
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
  gap: 2rem;
  padding: 2rem;
  justify-content: space-evenly;
  background: ${(props) => props.theme.lightGrey};
`;
