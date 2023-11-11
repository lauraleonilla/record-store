import React from 'react';

import './App.css';
import TopBar from './TopBar';
import BackgroundImage from './assets/albums.jpg';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from './assets/globalStyles';
import { Routes, Route } from 'react-router-dom';
import Footer from './Footer';
import MainPage from './MainPage';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ShoppingCart from './ShoppingCart';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <StyledApp>
        <GlobalStyle />
        <TopBar />
        <Main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/records" element={<Catalog />} />
          </Routes>
        </Main>
        <ShoppingCart />
        <Footer />
      </StyledApp>
    </ThemeProvider>
  );
};

const StyledApp = styled.div`
  background-image: url(${BackgroundImage});
  background-size: cover;
  background-attachment: fixed;
`;

const Main = styled.main`
  display: flex;
  justify-content: center;
`;

export default App;
