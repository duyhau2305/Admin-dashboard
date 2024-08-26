import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const userId = decodedToken.user.id;

      axios.get(`http://localhost:5000/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setUser(response.data);
        setFormData({
          username: response.data.username,
          name: response.data.name,
          email: response.data.email,
          password: '', // Để trống để người dùng có thể nhập mật khẩu mới
        });
      })
      .catch(error => {
        console.error('Lỗi khi lấy dữ liệu người dùng:', error);
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const userId = decodedToken.user.id;

      // Nếu mật khẩu là chuỗi trống, loại bỏ khỏi formData để không cập nhật
      const updateData = { ...formData };
      if (!formData.password) {
        delete updateData.password;
      }

      const response = await axios.put(`http://localhost:5000/api/users/${userId}`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data);
      setIsEditing(false);
      console.log('Thông tin người dùng đã được cập nhật:', response.data);
    } catch (error) {
      console.error('Lỗi khi cập nhật thông tin người dùng:', error.response?.data || error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  if (!user) {
    return <div className="text-center">Không có dữ liệu người dùng. Vui lòng đăng nhập.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Thông Tin Cá Nhân</h1>
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Tên đăng nhập:</label>
          {isEditing ? (
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
            />
          ) : (
            <p>{user.username || 'Không có thông tin'}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Tên:</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
            />
          ) : (
            <p>{user.name || 'Không có thông tin'}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
            />
          ) : (
            <p>{user.email || 'Không có thông tin'}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Mật khẩu:</label>
          {isEditing ? (
            <div className="relative">
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
                placeholder="Nhập mật khẩu mới nếu bạn muốn thay đổi"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 px-3 py-2 text-gray-700 focus:outline-none"
              >
                {isPasswordVisible ? 'Ẩn' : 'Hiện'}
              </button>
            </div>
          ) : (
            <p>********</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Vai trò:</label>
          <p>{user.isAdmin ? 'Admin' : 'User'}</p>
        </div>
        {isEditing ? (
          <div className="flex justify-between">
            <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Lưu thay đổi
            </button>
            <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-4 py-2 rounded-md">
              Hủy
            </button>
          </div>
        ) : (
          <button onClick={() => setIsEditing(true)} className="bg-green-500 text-white px-4 py-2 rounded-md">
            Chỉnh sửa thông tin
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
