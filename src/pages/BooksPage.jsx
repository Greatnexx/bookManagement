import React, { useEffect, useState } from 'react'
import { useDeleteBookMutation, useGetAllBooksQuery, useLazyGetAllBooksQuery, useLazySearchBooksQuery, useUpdateBookMutation } from '../store/bookApiSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Spinner } from '@material-tailwind/react';
import { FaStar } from 'react-icons/fa';
import { IoIosStar } from 'react-icons/io';


const BooksPage = () => {

  const [searchTerm,setSearchTerm]= useState("");
  const [filterData, setFilterData] = useState([])
  const [selectedItem, setSelectedItem] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [page, setPage] = useState(1)
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [publicationYear, setPublicationYear] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');

  const navigate = useNavigate()
  const userInfo = sessionStorage.getItem("userInfo")
  const parsedToken = userInfo && JSON.parse(userInfo)
  const token = parsedToken.data.token
  const {isLoading, error, data, refetch} = useGetAllBooksQuery({page, token})
  const [getAllBooks, {isLoading: booksLoading}] = useLazyGetAllBooksQuery()
  const [deleteBook, {isLoading: deleteLoading}] = useDeleteBookMutation()
  const [searchBooks, {}] = useLazySearchBooksQuery();
  const [updateBook] = useUpdateBookMutation();
  



  console.log("data: ", data)

  const handleSearch = async(e) => {
    e.preventDefault()
    await searchBooks({ keyword: searchTerm, token: token }).unwrap().then((response) => {
      console.log("search response: ", response)
      setFilterData(response.books)
    }).catch((error) => {
      toast.error(error)
    })
 }
  

 const UpdateBook = (item) => {
  console.log("item: ", item)
  setSelectedItem(item)
  setTitle(item.title)
  setAuthor(item.author)
  setGenre(item.genre)
  setPublicationYear(item.publicationYear)
  setDescription(item.description)
  setRating(item.rating)
  setShowModal(true)
 }


  const handleClick =(id) => {
    navigate(`/books/${id}`)
  }

    const DeleteBook = async (id,event) => {
       event.stopPropagation();
    
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (confirmDelete) {
      try {
        await deleteBook({ id: id, token: token }).unwrap();
        refetch();
        toast.success("Book deleted successfully!");
        
      } catch (error) {
        toast.error("Failed to delete book."); 
      }
    }
  };

  const handleOpen = () => {
    setShowModal(!showModal)
  }


  const fetchBooks = async (newPage) => {
    try {
        const response = await getAllBooks({ page: newPage, token }).unwrap();
        setFilterData(response.books); // Update the filter data with the new response
    } catch (error) {
        toast.error(error);
    }
};

  const handleNext = () => {
    const newPage = page + 1; // Calculate new page
    setPage(newPage); // Update the page state
    fetchBooks(newPage); // Fetch books for the new page
};

const handlePrevious = () => {
  if (page > 1) {
      const newPage = page - 1; // Calculate new page
      setPage(newPage); // Update the page state
      fetchBooks(newPage); // Fetch books for the new page
  }
};

  const handleEdit = async (e) => {
    e.preventDefault(); 
    try {
      await updateBook({
        id: selectedItem._id, 
        model: {
          title,
          author,
          genre,
          publicationYear, 
          description,
          rating
        },
        token
      }).unwrap();
      
      toast.success("Book updated successfully!");
      refetch(); 
      setShowModal(false); 
    } catch (error) {
      toast.error("Failed to update book.");
    }
  };
  

  useEffect(() => {
    if(data){
        setFilterData(data?.books)
    }
  }, [data])

  return (
    <div className='p-5'>

<div className="flex-1 mx-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search books..."
              className="w-[65%] px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              onKeyUp={handleSearch}
            />
          </div>

      
      <div className='container mx-auto grid md:grid-cols-3 gap-3 mt-16'>
     {filterData && filterData.map((book, i) => (
     <div key={i} className='shadow-sm p-5 m-3 border border-[#ccc] rounded-[10px]' >
      <div className="cursor-pointer "onClick={() => handleClick(book._id)}>
        <h2 className="text-[25px] font-bold mb-2">{book?.title}</h2>
        <h2 className="text-orange-900 text-[15px]">{book?.author}</h2>
        <p className='text-[12px] mt-4'>{book?.description}</p>
        <p className='text-[15px] font-bold'>{book?.genre}</p>
        <div className='mt-6'>
        <p>{book?.rating === 1 && (<><div><IoIosStar/></div></>)}</p>
        <p>{book?.rating === 2 && (<><div className='flex items-center gap-2'><FaStar/><FaStar/></div></>)}</p>
        <p>{book?.rating === 3 && (<><div  className='flex items-center gap-2' ><FaStar/><FaStar/><FaStar/></div></>)}</p>
        <p>{book?.rating === 4 && (<><div  className='flex items-center gap-2'><FaStar/><FaStar/><FaStar/><FaStar/></div></>)}</p>
        <p>{book?.rating === 5 && (<><div  className='flex items-center gap-2'><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></div></>)}</p>
        </div>
      </div>
     <div className='space-x-7 mt-4 float-end'>
       <button className="bg-blue-700 py-1 px-6 rounded-sm text-[#FFF]" onClick={() => UpdateBook(book)}>Edit</button>
       
       {isLoading ? (
         <button className="bg-red-900 py-1 px-6 rounded-sm text-[#FFF]" onClick={(event) => event.stopPropagation()}>
         <Spinner/>
         </button>
       ) : (
         <button className="bg-red-900 py-1 px-6 rounded-sm text-[#FFF]" onClick={(event) => DeleteBook(book._id, event)}>Delete</button>
       )}
     </div>
   </div>

      
     ))} 
    </div>
     <div className="flex justify-center items-center gap-3 mt-4">
        <button className='py-1 px-4 bg-black text-[#FFF] rounded-sm' onClick={handlePrevious}>Prev</button>
        <p>page {page} of {data?.pages}</p>
        <button className='py-1 px-4 bg-black text-[#FFF] rounded-sm' onClick={handleNext}>Next</button>
     </div>

    <Dialog open={showModal} handler={handleOpen}>
        <DialogHeader>update Books</DialogHeader>
        <DialogBody style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        <form className="space-y-5" onSubmit={handleEdit}>
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
            onClick={handleEdit}
            className="w-full px-4 py-2 text-white bg-blue-700 hover:bg-indigo-500 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            UpdateBook
          </button>
          </>)}
        </form>
        </DialogBody>
        <DialogFooter>
        <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>

  )
}

export default BooksPage
