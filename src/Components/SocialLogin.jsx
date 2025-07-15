import React, { useContext } from 'react'
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from '../Context/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const SocialLogin = () => {

  const {googleSignIn} = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSignIn = () => {
    googleSignIn()
    .then(()=>{
      toast.success("Successfully signed in with Google!");
      navigate('/');
    })
    .catch(() => {
      toast.error("Failed to sign in with Google. Please try again.");
    });
  }
  return (
    <div>
        <button onClick={handleSignIn} className="w-full bg-black text-white py-2 rounded-3xl font-medium hover:-translate-y-0.5 transition-all duration-200 flex justify-center items-center gap-2"><FcGoogle size={20}/> <h2>Sign up with Google</h2></button>
    </div>
  )
}

export default SocialLogin