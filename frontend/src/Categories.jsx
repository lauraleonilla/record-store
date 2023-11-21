import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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
      {categories?.length
        ? categories.map((category, index) => {
            return (
              <CategoryCard key={index}>
                <p>{category.categoryname}</p>
              </CategoryCard>
            );
          })
        : null}
    </CategoryContainer>
  );
};

const CategoryContainer = styled.div`
  position: sticky;
  top: 7.75rem;
  grid-column-start: 1;
  grid-column-end: 2;
  justify-self: end;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  background-color: ${(props) => props.theme.lightGrey};
  box-shadow: ${(props) => props.theme.shadows.smallAroundDark};
`;

const CategoryCard = styled.div`
  background-color: ${(props) => props.theme.white};
  height: 2.5rem;
  width: 15rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.grey};
`;

export default Categories;
