import React from "react";
import { NavLink, Link } from "react-router";
import { CiUser } from "react-icons/ci";

const Navbar = () => {
  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className="hover:font-semibold hover:bg-white transition-all duration-250 font-semibold"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/meals"
          className="hover:font-semibold hover:bg-white transition-all duration-250 font-semibold"
        >
          Meals
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/upcoming-meals"
          className="hover:font-semibold hover:bg-white transition-all duration-250 font-semibold"
        >
          Upcoming Meals
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-500  md:px-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-screen p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link to="/" className="font-bold text-xl">
          Meal Mate
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {/* <a className="btn">Button</a> */}

      <Link to='/signin' className="bg-black text-white px-6 py-2 font-bold rounded-3xl border-2 border-black outline-2 outline-black outline-offset-1 active:scale-95">Sign In <CiUser className="md:inline-block hidden" size={20}/></Link>


        {/* <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full ring ring-blue-400 ring-offset-base-100 ring-offset-2 transition duration-300">
              <img
                alt="User Avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">View Profile</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default Navbar;
