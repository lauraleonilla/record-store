import React from 'react';
import { Outlet } from 'react-router-dom';
import ShoppingCart from './ShoppingCart';
import Categories from '../Categories';
import { MainContent } from './MainContent';
import { PaginationProvider } from '../context/PaginationContext';

export default function RecordsLayout() {
  return (
    <PaginationProvider>
      <MainContent>
        <Outlet />
        <ShoppingCart />
      </MainContent>
    </PaginationProvider>
  );
}
