import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../store/userApiSlice'; // Import your registration hook
import { toast } from 'react-toastify';
import { Spinner } from '@material-tailwind/react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const [register, { isLoading }] = useRegisterMutation(); // Use the registration hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const model = {
      username,
      email,
      password
    };

    try {
      const response = await register(model).unwrap();
      toast.success("Registration successful!");
      navigate("/login"); 
    } catch (error) {
      toast.error(error.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
      <div className="md:w-[40%] p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-center text-2xl font-bold text-gray-900">Register</h2>
        <form className="mt-8 space-y-6 " onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className={`w-full px-4 py-3 text-white ${isLoading ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-700 hover:bg-indigo-500'} rounded-md shadow focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            disabled={isLoading}
          >
            {isLoading ? <Spinner className='text-center m-auto text-[#FFF]' /> : 'Sign Up'}
          </button>
        </form>
        <p className="text-[20px] text-center text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-700 hover:text-indigo-500">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;