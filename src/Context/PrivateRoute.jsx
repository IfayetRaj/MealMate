import React, { useContext } from 'react'
import { AuthContext } from './AuthContext'
import LoadingPage from '../Pages/LoadingPage';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);

  if(loading){
    return <LoadingPage></LoadingPage>
  }
  if(user && user.email){
    return children;
  }
  return <Navigate to='/signin'></Navigate>
}

export default PrivateRoute