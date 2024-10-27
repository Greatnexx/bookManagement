import { Link } from 'react-router-dom';
import { FaArrowCircleRight, FaSearch } from 'react-icons/fa';

const Navbar = () => {
  
  return (
    <nav className=" shadow-md bg-blue-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-[#FFF] ">
              Epic Reads
            </Link>
          </div>
 
          {/* Menu Links */}
          <div className="hidden md:flex items-center space-x-2 text-[#FFF]">
           <Link to ='/books'>
             <FaSearch/>
           </Link>
            <Link
              to="/"
              className="  px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>

            <Link
              to="/books"
              className="  px-3 py-2 rounded-md text-sm font-medium"
            >
              Books
            </Link>
            <Link
              to="/add"
              className="  px-3 py-2 rounded-md text-sm font-medium"
            >
              Add Book
            </Link>
            
          </div>

          <Link
              to="/books"
              className="md:hidden font-bold flex items-center   px-3 py-2 rounded-md text-sm  text-[#FFf] "
            >
              View Books
              <FaArrowCircleRight className='
              ml-2'/>
            </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
