import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetSingleBookQuery } from '../store/bookApiSlice';
import { IoIosStar } from 'react-icons/io';
import { FaStar } from 'react-icons/fa';

const SinglePage = () => {
  const params = useParams();
  const userInfo = sessionStorage.getItem("userInfo");
  const parsedToken = userInfo && JSON.parse(userInfo);
  const token = parsedToken.data.token;

  const { isLoading, data, error } = useGetSingleBookQuery({ id: params.id, token });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading book details.</p>;

  const book = data?.data;

  return (
    <div className='max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg border mt-12'>
      <div className="text-center mb-6">
        <h1 className='text-2xl font-semibold text-blue-700'>{book?.title}</h1>
        <h2 className='text-lg text-gray-600'>by {book?.author}</h2>
      </div>
      
      <div className="text-center mb-4">
        <p className='text-md text-gray-700 font-medium italic'>{book?.genre}</p>
        <p className='text-md text-gray-500'>Published: {book?.publicationYear}</p>
      </div>

      <hr className='my-4' />

      <div className='text-gray-800 text-base leading-relaxed'>
        <h3 className='text-lg font-semibold mb-2'>Description</h3>
        <p>{book?.description}</p>
      </div>

      <div className='mt-6  text-blue-700 text-[25px]'>
        <p>{book?.rating === 1 && (<><div><IoIosStar/></div></>)}</p>
        <p>{book?.rating === 2 && (<><div className='flex items-center gap-2 '><FaStar/><FaStar/></div></>)}</p>
        <p>{book?.rating === 3 && (<><div  className='flex items-center gap-2' ><FaStar/><FaStar/><FaStar/></div></>)}</p>
        <p>{book?.rating === 4 && (<><div  className='flex items-center gap-2'><FaStar/><FaStar/><FaStar/><FaStar/></div></>)}</p>
        <p>{book?.rating === 5 && (<><div  className='flex items-center gap-2'><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></div></>)}</p>
        </div>
    </div>
  );
};

export default SinglePage;
