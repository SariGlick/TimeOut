import { useState, useEffect } from 'react';

function UserNameProvider({ children }) {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem('nameUser');
    setUsername(storedUsername);
  }, []);

  return children ? children({ username }) : null;
}