import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Test() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/v1/me')
      .then(response => { 
        setUserData(response.data.user);
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!userData) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h2>User Profile</h2>
        <p>Name: {userData.name}</p>
        <p>Email: {userData.email}</p>
        <p>Role: {userData.role}</p>
      </div>
    );
  }
}

export default Test;