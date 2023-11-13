import React from 'react';
import './App.css';
import TopBar from './TopBar';
import BackgroundImage from './assets/albums.jpg';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from './assets/globalStyles';
import { Routes, Route } from 'react-router-dom';
import Footer from './Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import { CartProvider } from './context/Cart/CartContext';
import Categories from './Categories';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <StyledApp>
        <GlobalStyle />
        <TopBar />
        <CartProvider>
        <Main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/records" element={<Catalog />} />
          </Routes>
          <Categories />
        </Main>
        </CartProvider>
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
