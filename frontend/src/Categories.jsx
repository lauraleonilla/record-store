import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const apiUrl = 'http://localhost:3001/main/categories';
    const fetchCategories = async () => {
      try {
        const response = await axios.get(apiUrl);
        setCategories(response.data);
      } catch (error) {
        console.error('Error: ', error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <CategoryContainer>
      <Categoryh1>Kategoriat</Categoryh1>
      {categories?.length
        ? categories.map((category, index) => (
            <React.Fragment key={index}>
              {category.categoryname === 'Kaikki kategoriat' ? (
                <StyledLink to={`/records/1`}>
                  <CategoryCard>
                    <p>{category.categoryname}</p>
                  </CategoryCard>
                </StyledLink>
              ) : (
                <StyledLink to={`/records/genre/${category.categoryname}/1`} key={index}>
                  <CategoryCard>
                    <p>{category.categoryname}</p>
                  </CategoryCard>
                </StyledLink>
              )}
            </React.Fragment>
          ))
        : null}
    </CategoryContainer>
  );
};

const Categoryh1 = styled.h1`
  padding: 1rem;
  font-weight: bold;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const CategoryContainer = styled.div`
  position: sticky;
  top: 7.75rem;
  grid-column-start: 1;
  grid-column-end: 2;
  justify-self: end;
  background-color: ${(props) => props.theme.lightGrey};
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  background-color: ${(props) => props.theme.lightGrey};
  box-shadow: ${(props) => props.theme.shadows.smallAroundDark};
  padding-bottom: 1rem;
`;

const CategoryCard = styled.div`
  background-color: ${(props) => props.theme.white};
  height: 2.5rem;
  width: 15rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.grey};
  border-radius: 5px;
  font-size: 24px;
`;

export default Categories;
