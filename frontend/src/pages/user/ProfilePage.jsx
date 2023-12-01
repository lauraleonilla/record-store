import styled from 'styled-components';
import { MainContent } from '../../components/MainContent';
import { useEffect, useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';

export function ProfilePage() {
  const { user, accessToken } = useContext(UserContext);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNum: '',
    street: '',
    postalCode: '',
    city: ''
  });

  async function getProfile() {
    console.log(user);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/users/getprofile`, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({ email: user })
      });
      if (res.ok) {
        const userDetails = await res.json();
        const { firstname, lastname, email, phonenum, street, postalcode, city } = userDetails[0];

        setUserData({
          firstName: firstname,
          lastName: lastname,
          email: email,
          phoneNum: phonenum,
          street: street,
          postalCode: postalcode,
          city: city
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    console.log(accessToken);
    getProfile();
  }, []);

  return (
    <MainContent>
      <Container>
        <UserDetails>
          <Item>{userData.firstName}</Item>
          <Item>{userData.lastName}</Item>
          <Item>{userData.email}</Item>
          <Item>{userData.phoneNum}</Item>
          <Item>{userData.street}</Item>
          <Item>{userData.postalCode}</Item>
          <Item>{userData.city}</Item>
        </UserDetails>
      </Container>
    </MainContent>
  );
}
const Container = styled.div`
  grid-column: 2 / 3;
  display: flex;
  max-width: 50vw;
`;

const UserDetails = styled.ul``;
const Item = styled.li``;
