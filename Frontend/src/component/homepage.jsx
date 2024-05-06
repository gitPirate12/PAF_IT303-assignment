import React, { useState, useEffect } from 'react';

function Homepage() {
  const [data, setData] = useState(null);

  const handleLogin = () => {
    console.log('login button clicked');
  };

  const handleRegister = () => {
    // Implement register functionality here
    console.log('Register button clicked');
  };

  const fetchHome = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/homepage',{
      method: 'GET', // Specify the method type (GET in this case)
      credentials: 'include', // Include credentials (cookies) in the request
    });
      if (!res.ok) {
        throw new Error('Failed to fetch homepage data');
      }
      const data = await res;
      console.log(data);
            if (res.redirected){
                document.location = res.url;
            }
      setData(data);
      if (res.redirected) {
        window.location.href = res.url;
      }
    } catch (error) {
      console.error('Error fetching homepage data:', error);
    }
  };

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    fetchHome();
  }, []);

  return (
    <div>
      <h1>Welcome to FitFusion</h1>
      <div>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleRegister}>Register</button>
      </div>
      {data && (
        <div>
          <h2>Data from Backend:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default Homepage;
