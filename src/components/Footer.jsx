import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa'; // Install react-icons if you haven't already
import { MdOutlineMailOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-blue-700 text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Description */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-white">Epic Reads</h2>
            <p className="mt-2 text-sm">
              Your personal book management system. Organize, track, and manage your book collection effortlessly.
            </p>
          </div>

          {/* Footer Links */}
          <div className="flex space-x-8 mb-6 md:mb-0">
            {/* <Link to="/" className="hover:text-white bg-black py-2 px-7 rounded-md">
              Home
            </Link> */}
            <Link to="/add" className="hover:text-white bg-black py-2 px-7 rounded-md">
              Add Book
            </Link>
          
          </div>

        
           <div className="flex space-x-6">
            <Link to="https://www.facebook.com/profile.php?id=100087845091493" className="text-gray-300 hover:text-white">
              <FaFacebook size={24} />
            </Link>
            <Link to="https://wa.me/2348066870296" className="text-gray-300 hover:text-white">
              <FaWhatsapp size={24} />
            </Link>
            <a href="mailto:godwindanielgodwin@gmail.com" className="text-gray-300 hover:text-white">
              <MdOutlineMailOutline size={24}/>
                 </a>
          </div>
        </div>

        {/* Copyright Info */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-sm text-gray-400">
            &copy; 2024 BookStore. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
