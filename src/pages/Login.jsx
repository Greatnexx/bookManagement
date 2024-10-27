import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../store/userApiSlice';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/authSlice';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Spinner } from '@material-tailwind/react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword ,setShowPassword] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [login, {isLoading}] = useLoginMutation();

  const handleShow =()=>{
    setShowPassword(!showPassword);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const model = {
      email,
      password
    }
    console.log({ email, password });
  
    try {
      const response = await login(model).unwrap();
      console.log("response: ", response);
      
      if (response?.data) {
        dispatch(setCredentials({ ...response }));
        toast.success("User  Authentication was successful!");
        navigate("/");
      } 
    } catch (error) {
      toast.error(error.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="md:w-[40%] p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-center text-2xl font-bold text-gray-900">Login</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-[20px] font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder='your email@gmail.com'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className='relative'>
              <label htmlFor="password" className="block text-[20px] font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text":"password"}
                placeholder='xxxxxxx'
                required
                value={password}
                
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                
              />
              <div className='absolute top-14 right-4'>
              {showPassword ? (<><FaEye onClick={handleShow}/></>):(<><FaEyeSlash onClick={handleShow}/></>)}

              </div>
            </div>
          </div>
          {
            isLoading ? (
              <>
                <button
                  type="submit"
                  className="w-full px-4 py-3 text-white bg-gray-600 rounded-md shadow focus:outline-none focus:ring-2 cursor-not-allowed"
                >
                  <Spinner className='text-center m-auto text-[#FFF]'/>
                </button>
              </>
            ) : (
              <>
                <button
                  type="submit"
                  className="w-full px-4 py-3 text-white bg-blue-700 hover:bg-indigo-500 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Sign In
                </button>
              </>
            )
          }
        </form>
        <p className="text-[20px] text-center text-gray-600">
          Don't have an account? <Link to="/register" className="text-indigo-600 hover:text-indigo-500">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
