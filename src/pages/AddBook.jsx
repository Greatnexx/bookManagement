import React, { useState } from 'react';
import { useAddBookMutation } from '../store/bookApiSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Spinner } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { FaArrowCircleLeft, FaArrowLeft } from 'react-icons/fa';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [publicationYear, setPublicationYear] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');

  const navigate = useNavigate();

  const userInfo = sessionStorage.getItem("userInfo")
  const parsedToken = userInfo && JSON.parse(userInfo)
  const token = parsedToken.data.token
  const [addBook, {isLoading},refetch] = useAddBookMutation()



  const handleSubmit = async(e) => {
    e.preventDefault();
  
    const model = { title, author, genre, publicationYear, description, rating };

    const response = await addBook({
      model,
      token
    }).unwrap();

    console.log("response: ", response)
    toast.success("Books Added SucessFully")
    navigate('/books')
    refetch();
    
  
    setTitle('');
    setAuthor('');
    setGenre('');
    setPublicationYear('');
    setDescription('');
    setRating('');
  };

  return (
    <>
      <Link to='/' className=' px-2 flex items-center mt-3'> <FaArrowLeft className='mr-2 ' />Go Back</Link>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-center text-2xl font-bold text-gray-900">Add a New Book</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Author */}
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700">
              Author
            </label>
            <input
              id="author"
              name="author"
              type="text"
              required
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Genre */}
          <div>
            <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
              Genre
            </label>
            <input
              id="genre"
              name="genre"
              type="text"
              required
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Publication Year */}
          <div>
            <label htmlFor="publicationYear" className="block text-sm font-medium text-gray-700">
              Publication Year
            </label>
            <input
              id="publicationYear"
              name="publicationYear"
              type="number"
              required
              value={publicationYear}
              onChange={(e) => setPublicationYear(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              rows="4"
            ></textarea>
          </div>

          {/* Rating */}
          <div>
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
              Rating (out of 5)
            </label>
            <input
              id="rating"
              name="rating"
              type="number"
              min="1"
              max="5"
              required
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Submit Button */}

          {isLoading? (<>
            <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-700 hover:bg-indigo-500 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <Spinner className='text-center m-auto' />
          </button>
          
          
          </>):(<>
          
          
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-700 hover:bg-indigo-500 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Add Book
          </button>
          </>)}
        </form>
      </div>
    </div>
    </>
  );
};

export default AddBook;
