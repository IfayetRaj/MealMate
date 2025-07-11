import React from 'react'
import { FcGoogle } from "react-icons/fc";

const SocialLogin = () => {
  return (
    <div>
        <button className="w-full bg-black text-white py-2 rounded-3xl font-medium hover:-translate-y-0.5 transition-all duration-200 flex justify-center items-center gap-2"><FcGoogle size={20}/> <h2>Sign up with Google</h2></button>
    </div>
  )
}

export default SocialLogin