import React from 'react';
import './App.css';
import TopBar from './TopBar';
import BackgroundImage from './assets/albums.jpg';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from './assets/globalStyles';
import { Routes, Route } from 'react-router-dom';
import Footer from './Footer';
import Home from './pages/Home';
import { CartProvider } from './context/Cart/CartContext';
import { CatalogPage } from './pages/CatalogPage';
import { AlbumSearch } from './pages/Search';
import { SearchProvider } from './context/AlbumSearchContext';
import RecordsLayout from './components/RecordsLayout';
// import { BodyWrapper } from './components/BodyWrapper,';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <StyledApp>
        <GlobalStyle />
        <SearchProvider>
          <TopBar />
          <CartProvider>
            {/* <BodyWrapper> */}
            <Routes>
              <Route element={<RecordsLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="records">
                  <Route path=":page" element={<CatalogPage />} />
                </Route>
                <Route path="search" element={<AlbumSearch />} />
              </Route>
            </Routes>
            {/* </BodyWrapper> */}
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
  height: fit-content;
`;

export default App;
