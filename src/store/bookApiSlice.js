import { apiSlice } from './apiSlice';
const handleResponse = (response) => {
  return response
};


export const bookApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addBook: builder.mutation({
      query: ({model, token}) => ({
        url: `https://backendproject-beta.vercel.app/api/books`,
        method: 'POST',
        body: model,
        headers: {
            'Authorization':   `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
      }),
      transformResponse: handleResponse,
    }),
    
    getAllBooks: builder.query({
        query: ({page, token}) => ({
            url: `https://backendproject-beta.vercel.app/api/books?page=${page}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':   `Bearer ${token}`,
            },
        }),
        transformResponse: handleResponse,
    }),
    
    searchBooks: builder.query({
        query: ({keyword, token}) => ({
            url: `https://backendproject-beta.vercel.app/api/books?keyword=${keyword}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':   `Bearer ${token}`,
            },
        }),
        transformResponse: handleResponse,
    }),
    
    getSingleBook: builder.query({
        query: ({id, token}) => ({
            url: `https://backendproject-beta.vercel.app/api/books/${id}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':   `Bearer ${token}`,
            },
        }),
        transformResponse: handleResponse,
    }),
    
    deleteBook: builder.mutation({
        query: ({id, token}) => ({
            url: `https://backendproject-beta.vercel.app/api/books/${id}`,
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':   `Bearer ${token}`,
            },
        }),
        transformResponse: handleResponse,
    }),
    updateBook: builder.mutation({
        query: ({id, model, token}) => ({
            url: `https://backendproject-beta.vercel.app/api/books/${id}`,
            method: 'PUT',
            body: model,
            headers: {
                'Authorization':   `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }),
        transformResponse: handleResponse,
    }),


  }),
});

export const {
  useAddBookMutation,
  useGetAllBooksQuery,
  useLazyGetAllBooksQuery,
  useGetSingleBookQuery,
  useLazySearchBooksQuery,
  useDeleteBookMutation,
  useUpdateBookMutation,
} = bookApiSlice;
