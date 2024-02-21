import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import {getStorageItem} from '../utils/index'

export default function UnProtectedRoute({Component}) {
  const navigate = useNavigate(); 

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const userData = await getStorageItem('user');
      if (userData) {
        navigate('/dashboard');
      }
    };
  
    checkUserLoggedIn();
  }, [getStorageItem, navigate]);

  return (
    <div>
      <Component />
    </div>
  );
}

