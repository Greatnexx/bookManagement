import { apiSlice } from './apiSlice';
const handleResponse = (response) => {
  return response
};


export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `https://backendproject-beta.vercel.app/api/users/login`,
        method: 'POST',
        body: data,
      }),
      transformResponse: handleResponse,
    }),
    
    getActiveCards: builder.query({
      query: (token) => ({
        url: `${process.env.REACT_APP_USER}/Users/getactivecards`,
        method: 'GET',
        headers: {
          'Authorization': token,
        },
      }),
      transformResponse: handleResponse,
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `https://backendproject-beta.vercel.app/api/users/register`,
        method: 'POST',
        body: data,
      }),
      transformResponse: handleResponse,
    }),

  }),
});

export const {
  useLoginMutation,
  useRegisterMutation
  
} = userApiSlice;
