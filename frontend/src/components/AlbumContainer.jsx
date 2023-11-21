import styled from 'styled-components';

export const AlbumContainer = styled.div`
  grid-column-start: 2;
  grid-column-end: 3;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(13rem, 1fr));
  gap: 3rem;
  padding: 2rem;
  min-width: 100%;
  justify-items: center;
  background: ${(props) => props.theme.lightGrey};
  box-shadow: ${(props) => props.theme.shadows.smallAroundDark};
`;
