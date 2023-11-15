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
import { AllAlbums } from './components/AllAlbums';
import { AlbumSearch } from './components/AlbumSearch';
import { SearchProvider } from './context/AlbumSearchContext';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <StyledApp>
        <GlobalStyle />
        <SearchProvider>
          <TopBar />
          <CartProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="records" element={<Catalog />}>
                <Route path="all" element={<AllAlbums />} />
                <Route path="search" element={<AlbumSearch />} />
              </Route>
            </Routes>
          </CartProvider>
        </SearchProvider>
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

export default App;
