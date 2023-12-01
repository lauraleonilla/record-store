import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  function loginUser(user) {
    setUser(user.email);
    localStorage.setItem('user', JSON.stringify(user.email));
    setAccessToken(user.accessToken);
  }

  function logoutUser(value) {
    setUser(value);
    localStorage.removeItem('user');
  }

  async function authenticateUser() {
    if (user) {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/generatetoken`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ email: user })
      });
      if (res.ok) {
        const token = await res.json();

        console.log(token);
        setAccessToken(token.accessToken);
      }
    }
  }
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setUser(JSON.parse(user));
      authenticateUser();
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, accessToken, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
}
