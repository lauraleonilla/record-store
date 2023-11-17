import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { PaginationContext } from '../context/PaginationContext';
import { NavLink } from 'react-router-dom';

export function Pagination({ currentPage }) {
  const { itemCount, itemsPerPage } = useContext(PaginationContext);
  const totalPages = Math.ceil(itemCount / itemsPerPage);
  const getPageLink = (page) => `/records/${page}`;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <li key={i}>
        <Pagelink to={getPageLink(i)}>{i}</Pagelink>
      </li>
    );
  }

  useEffect(() => {
    console.log(currentPage);
  });

  const pattern = /\/records\/.*$/;
  if (pattern.test(window.location.pathname)) {
    return (
      <PagesContainer>
        <PrevPageBtn to={`/records/${currentPage > 1 ? parseInt(currentPage) - 1 : currentPage}`}>
          prev
        </PrevPageBtn>
        <PagesList>{pages}</PagesList>
        <NextPageBtn
          to={`/records/${currentPage < totalPages ? parseInt(currentPage) + 1 : currentPage}`}>
          next
        </NextPageBtn>
      </PagesContainer>
    );
  }
}

const PagesContainer = styled.div`
  grid-column-start: 2;
  grid-row-start: 3;
  display: flex;
  flex-direction: row;
  margin: 1rem;
  gap: 1rem;
  justify-content: center;
`;

const PrevPageBtn = styled(NavLink)`
  &:hover {
    color: ${(props) => props.theme.grey};
  }
  &:active {
    color: ${(props) => props.theme.orange};
  }
`;

const NextPageBtn = styled(NavLink)`
  &:hover {
    color: ${(props) => props.theme.grey};
  }
  &:active {
    color: ${(props) => props.theme.orange};
  }
`;

const PagesList = styled.ul`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding: 0;
  list-style: none;
`;

const Pagelink = styled(NavLink)`
  &.active {
    color: ${(props) => props.theme.darkOrange};
  }
  &:hover {
    color: ${(props) => props.theme.grey};
  }
`;
