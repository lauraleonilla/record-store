import React from 'react';
import { Outlet } from 'react-router-dom';

import ShoppingCart from '../components/ShoppingCart';
import Categories from '../Categories';
import { MainContent } from '../components/MainContent';

export default function Catalog() {
  return (
    <MainContent>
      <Categories />
      <Outlet />
      <ShoppingCart />
    </MainContent>
  );
}
