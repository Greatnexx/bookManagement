import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <>
    <div className="bg-cover bg-center h-screen relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512820790803-83ca734da794')" }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white">
        <h1 className="text-4xl font-bold md:text-6xl">
          Manage Your Book Collection Effortlessly
        </h1>
        <p className="mt-4 text-lg md:text-2xl max-w-2xl">
          Keep track of your favorite books, manage your reading list, and add new titles with ease. Organize your book collection with just a few clicks!
        </p>
        <div className="mt-8">
          <Link
            to="/add"
            className="px-9 py-4 bg-blue-800 hover:bg-indigo-500 text-white text-lg font-semibold rounded-md shadow-md"
          >
            Add Your First Book
          </Link>
        </div>
      </div>
    </div>





   </>
  );
};

export default HeroSection;
