import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { PaginationContext } from '../context/PaginationContext';
import { NavLink } from 'react-router-dom';

export function Pagination({ currentPage, categoryName }) {
  const { itemCount, itemsPerPage } = useContext(PaginationContext);
  const totalPages = Math.ceil(itemCount / itemsPerPage);

  const getPageLink = (page) => {
    if (categoryName) {
      return `/records/genre/${categoryName}/${page}`;
    } else {
      return `/records/${page}`;
    }
  };

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <li key={i}>
        <Pagelink to={getPageLink(i)}>{i}</Pagelink>
      </li>
    );
  }
  const showPrevNextButtons = totalPages > 1;

  useEffect(() => {
    console.log(currentPage);
  });

  const pattern = /\/records\/.*$/;
  if (pattern.test(window.location.pathname)) {
    return (
      <PagesContainer>
        {showPrevNextButtons && ( // Conditionally render the "prev" button
          <PrevPageBtn to={getPageLink(currentPage > 1 ? parseInt(currentPage) - 1 : currentPage)}>
            Edellinen
          </PrevPageBtn>
        )}
        <PagesList>{pages}</PagesList>
        {showPrevNextButtons && ( // Conditionally render the "next" button
          <NextPageBtn
            to={getPageLink(currentPage < totalPages ? parseInt(currentPage) + 1 : currentPage)}>
            Seuraava
          </NextPageBtn>
        )}
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
