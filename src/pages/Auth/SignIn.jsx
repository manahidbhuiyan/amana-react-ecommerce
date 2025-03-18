import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; // Add this import
import { signInUser } from '../../features/auth/authSlice';

const SignInComponent = () => {
  const dispatch = useDispatch(); // Add this line
  
  const [credentials, setCredentials] = useState({
    phoneOrEmail: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCredentials({
      ...credentials,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Add this to prevent default form submission
    dispatch(signInUser({ 
      email: credentials.phoneOrEmail, // Fixed: removed setCredentials, use credentials directly
      password: credentials.password 
    }));
  };



  return (
    <div className='w-full bg-[#F8F5F5] pt-14 pb-14 '>
      <div className="w-full md:w-[400px] lg:w-[500px] mt-[100px] mx-3 md:mx-auto bg-white p-6 rounded shadow-[0_0_4px_2px_rgba(0,0,0,0.03)] ">
      <h2 className="text-center text-xl font-semibold text-gray-800 mb-6">SIGN IN HERE</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="phoneOrEmail" className="block text-gray-700 mb-1">
            Phone Number or Email <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </div>
            <input
              type="text"
              id="phoneOrEmail"
              name="phoneOrEmail"
              placeholder="phone number or email"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
              onChange={handleChange}
              value={credentials.phoneOrEmail}
              required
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-1">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
              onChange={handleChange}
              value={credentials.password}
              required
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="rememberMe"
              className="border-gray-300 rounded text-green-600 focus:ring-green-500"
              onChange={handleChange}
              value={credentials.rememberMe}
            />
            <span className="ml-2 text-gray-700">Remember Me</span>
          </label>
        </div>
        
        <button
          type="submit"
          className="w-full bg-pink-400 hover:bg-pink-500 text-white py-2 px-4 rounded transition duration-200"
        >
          SIGN IN
        </button>
      </form>
      
      <div className="mt-4 text-center text-sm">
        <p className="text-gray-700">
          Don't have an account? 
          <a href="#register" className="text-pink-400 ml-1 hover:text-pink-600">
            Register Now
          </a>
        </p>
        <p className="mt-2">
          <a href="#forgot" className="text-pink-400 hover:text-pink-600">
            Forgot Password?
          </a>
        </p>
      </div>
    </div>
    </div>
  );
};

export default SignInComponent;