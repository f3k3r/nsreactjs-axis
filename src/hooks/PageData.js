"use client"
import { useState, useEffect } from 'react';

const PageData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const API_URL = `${process.env.REACT_APP_API_URL2}?action=axisData`;
      
      try {
        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json(); 
        const data1 = atob(result.data); 
        const data = JSON.parse(data1);
        if (result.status === 200) {
            setData(data);
        } else {
          throw new Error('Error in fetching data - Status not 200');
        }
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []); 

  return { data, loading, error }; 
};

export default PageData;
