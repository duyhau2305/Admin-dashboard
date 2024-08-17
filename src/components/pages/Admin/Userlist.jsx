// src/components/UserList.js

import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaLock, FaUnlock, FaPlus, FaEnvelope } from 'react-icons/fa';
import UserFormModal from './UserFormModal';
import { toast, ToastContainer } from 'react-toastify';
import emailjs from 'emailjs-com';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers().then(data => setUsers(data));
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Lỗi khi tải danh sách người dùng');
    }
  };

  const handleCreateUser = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleSaveUser = async (data) => {
    try {
      if (selectedUser) {
        // Cập nhật người dùng
        await fetch(`http://localhost:5000/api/users/${selectedUser.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        setUsers(users.map(user => (user.id === selectedUser.id ? { ...user, ...data } : user)));
        toast.success('Cập nhật người dùng thành công');
      } else {
        // Tạo người dùng mới
        await fetch('http://localhost:5000/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const newUser = { ...data, id: Date.now() };
        setUsers([...users, newUser]);
        toast.success('Tạo người dùng mới thành công');
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving user:', error);
      toast.error('Lỗi khi lưu người dùng');
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/users/${id}`, {
        method: 'DELETE',
      });
      setUsers(users.filter(user => user.id !== id));
      toast.success('Xóa người dùng thành công');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Lỗi khi xóa người dùng');
    }
  };

  const handleToggleLockUser = async (id) => {
    const user = users.find(user => user.id === id);
    try {
      await fetch(`http://localhost:5000/api/users/${id}/lock`, {
        method: 'PUT',
      });
      setUsers(users.map(user => (user.id === id ? { ...user, locked: !user.locked } : user)));
      toast.success('Thay đổi trạng thái khóa/mở khóa thành công');
    } catch (error) {
      console.error('Error toggling user lock:', error);
      toast.error('Lỗi khi thay đổi trạng thái khóa');
    }
  };

  const handleSendEmail = (user) => {
    const templateParams = {
      to_email: user.email,
      username: user.username,
      password: user.password,
    };

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_USER_ID')
      .then(() => {
        toast.success(`Email đã được gửi đến ${user.email}`);
      }, (error) => {
        toast.error('Lỗi khi gửi email');
        console.error('EmailJS Error:', error);
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Quản Lý Người Dùng</h1>
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded-md flex items-center hover:bg-blue-700"
          onClick={handleCreateUser}
        >
          <FaPlus className="mr-2" /> Tạo Tài Khoản
        </button>
      </div>

      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-300">
            <th className="py-3 px-4 text-left">Mã Nhân Viên</th>
            <th className="py-3 px-4 text-left">Tên đăng nhập</th>
            <th className="py-3 px-4 text-left">Tên</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Vai trò</th>
            <th className="py-3 px-4 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50 transition duration-150 ease-in-out">
              <td className="py-3 px-4">{user.employeeId}</td>
              <td className="py-3 px-4">{user.username}</td>
              <td className="py-3 px-4">{user.name}</td>
              <td className="py-3 px-4">{user.email}</td>
              <td className="py-3 px-4">{user.role}</td>
              <td className="py-3 px-4 flex justify-center">
                <button
                  className="text-blue-600 hover:text-blue-800 mx-2"
                  title="Gửi email"
                  onClick={() => handleSendEmail(user)}
                >
                  <FaEnvelope />
                </button>
                <button
                  className="text-green-600 hover:text-green-800 mx-2"
                  title="Sửa"
                  onClick={() => handleEditUser(user)}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-600 hover:text-red-800 mx-2"
                  title="Xóa"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  <FaTrash />
                </button>
                <button
                  className="text-gray-600 hover:text-gray-800 mx-2"
                  title={user.locked ? 'Mở khóa' : 'Khóa'}
                  onClick={() => handleToggleLockUser(user.id)}
                >
                  {user.locked ? <FaUnlock /> : <FaLock />}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* User Form Modal */}
      {isModalOpen && (
        <UserFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveUser}
          initialData={selectedUser}
        />
      )}
      <ToastContainer/>
    </div>
  );
};

export default UserList;
