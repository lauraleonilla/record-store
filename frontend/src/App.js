import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const apiUrl = "http://localhost:3001";
    const fetchData = async () => {
      const response = await axios.get(apiUrl);
      setData(response.data);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>{data}</h1>
      </header>
    </div>
  );
};

export default App;
