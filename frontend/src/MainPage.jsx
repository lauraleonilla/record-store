import React from 'react';

import './App.css';
import styled from 'styled-components';
import Categories from './Categories';

const MainPage = () => {
  return (
    <StyledMainPage>
      <Categories />
    </StyledMainPage>
  );
};

const StyledMainPage = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
`;

export default MainPage;
