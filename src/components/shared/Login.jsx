import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUserAlt, FaLock, FaEye, FaEyeSlash, FaUsers, FaBook } from 'react-icons/fa'; 
import { toast } from 'react-toastify';

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/login', { 
        username, 
        password 
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token); // Save token to localStorage
        toast.success('Đăng nhập thành công!');
        navigate('/'); // Navigate to the homepage after a successful login
      } else {
        toast.error('Đăng nhập không thành công!');
      }
    } catch (error) {
      console.log('Error:', error);
      console.log('Error Response:', error.response);

      if (error.response) {
        if (error.response.status === 400 || error.response.status === 401) {
          toast.error('Tài khoản hoặc mật khẩu không đúng!');
        } else {
          toast.error('Có lỗi xảy ra khi đăng nhập.');
        }
      } else {
        toast.error('Không thể kết nối tới server.');
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-cyan-500 to-blue-700">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800">Sign In to Your Account</h2>
        
        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="relative">
            <FaUserAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
            <input
              id="username"
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500"
              placeholder="Username"
            />
          </div>
          
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full py-2 pl-10 pr-10 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button type="submit" className="w-full py-2 text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:bg-blue-700">
            Sign in
          </button>

          <div className="flex items-center justify-center space-x-12">
            <label htmlFor="remember-me" className="flex items-center text-gray-600">
              <input id="remember-me" type="checkbox" className="text-blue-600 border-gray-300 rounded focus:ring-blue-500"/>
              <span className="ml-2 text-sm">Remember me</span>
            </label>
            
            <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
          </div>
        </form>

        <div className="flex items-center justify-center space-x-10">
          <a href="#" className="flex items-center text-blue-600 hover:underline">
            <FaUsers className="mr-2" />
            Nhóm hỗ trợ
          </a>
          <a href="#" className="flex items-center text-blue-600 hover:underline">
            <FaBook className="mr-2" />
            Tài liệu hướng dẫn
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;