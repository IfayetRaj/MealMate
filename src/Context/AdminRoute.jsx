import React, { useContext } from 'react'
import { AuthContext } from './AuthContext'
import LoadingPage from '../Pages/LoadingPage';
import { Navigate } from 'react-router';

const AdminRoute = ({children}) => {
    const {userData, loading} = useContext(AuthContext);
  if(loading){
    return <LoadingPage></LoadingPage>
  }
  if(userData?.role === "admin"){
    return children;
  }
  return <Navigate to='/signin'></Navigate>
}

export default AdminRoute