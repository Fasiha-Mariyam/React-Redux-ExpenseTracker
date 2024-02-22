import React, { useEffect , useState} from 'react';
import { useNavigate } from 'react-router-dom'; 
import {getStorageItem} from '../utils/index'

export default function ProtectedRoute({Component}) {

  const navigate = useNavigate(); 
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const userData = await getStorageItem('user');
      if (!userData) {
        setLoader(false);
        navigate('/login');
      }
        else {
          setLoader(false);
        }
      
    };
  
    checkUserLoggedIn();
  }, [getStorageItem , navigate]);

  return (
    <div>{loader ? <></> : <Component />}</div>
  )
}
