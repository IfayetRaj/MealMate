import React, { useContext } from "react";
import SocialLogin from "../Components/SocialLogin";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-hot-toast";

const SignInPage = () => {
  const{signInUser} = useContext(AuthContext);

  const navigate = useNavigate();
  // const location = useLocation();
  // const from = location.state?.from?.pathname || "/";

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
    .then(()=>{
      navigate('/'); 
      form.reset();
      toast.success("Successfully signed in!");
    })
    .catch(() => {
      toast.error("Failed to sign in. Please check your credentials.");
    });
  }


  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{
        backgroundImage: `url('/banner.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md border-2 border-black outline-2 outline-black outline-offset-2 rounded-3xl p-8 shadow-xl">
        <h2 className="text-3xl md:text-4xl text-center font-extrabold  mb-2">
          Sign In your account
        </h2>
        <p className="text-sm text-center mb-6">
          Give us some of your information to get access to{" "}
          <Link to="/" className="font-bold text-lg">
            MealMate.
          </Link>
        </p>

        <form className="space-y-4" onSubmit={handleFormSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            className="w-full px-4 py-3  border-b-2 outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-3  border-b-2 outline-none"
          />
          <p className="text-xs ">
            Password must contain at least eight characters, including at least
            1 letter and 1 number.
          </p>

          <button
            type="submit"
            className="w-full bg-white border-1 outline-1 outline-offset-1  rounded-full hover:-translate-y-0.5 transition-all duration-200 font-semibold py-2 mt-4"
          >
            Sign up →
          </button>

          <p className="text-xs text-center text-gray-400">
            By clicking "Sign up", you agree to our{" "}
            <a href="#" className="text-blue-400 underline">
              terms of service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-400 underline">
              privacy policy
            </a>
            .
          </p>
        </form>

        <div className="flex items-center justify-between my-6">
          <hr className="w-1/3 border-gray-500" />
          <span className="text-sm text-gray-400">OR</span>
          <hr className="w-1/3 border-gray-500" />
        </div>

        <div>
          <SocialLogin />
        </div>

        <p className="text-sm text-center text-gray-400 mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
