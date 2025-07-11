import React from "react";
import { Link } from "react-router";
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black bg-opacity-50 backdrop-blur-md border-t border-white/20 text-white py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo + Name */}
        <div>
          <Link to="/" className="flex items-center gap-3 mb-4">
            <img src="https://i.postimg.cc/LsnbLDpf/Screenshot-2025-07-11-at-1-56-14-AM.png" alt="Logo" className="h-12 w-12 object-cover rounded-full border border-white/30" />
            <span className="text-2xl font-bold">Meal Mate</span>
          </Link>
          <p className="text-gray-200">
            Streamline your hostel meal management with style.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-blue-300 transition">Home</Link></li>
            <li><Link to="/meals" className="hover:text-blue-300 transition">Meals</Link></li>
            <li><Link to="/upcomingmeals" className="hover:text-blue-300 transition">Upcoming Meals</Link></li>
            <li><Link to="/join" className="hover:text-blue-300 transition">Join Us</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact</h4>
          <p className="text-gray-200">123 University Road</p>
          <p className="text-gray-200">Dhaka, Bangladesh</p>
          <p className="mt-2 text-gray-200">info@mealmate.com</p>
          <p className="text-gray-200">+880 123 456 789</p>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            {[FaFacebookF, FaTwitter, FaInstagram, FaGithub].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-white/20 border border-white/30 rounded-full backdrop-blur hover:bg-white/40 transition"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/20 mt-10 pt-6 text-center text-gray-300 text-sm">
        &copy; {new Date().getFullYear()} Meal Mate — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;