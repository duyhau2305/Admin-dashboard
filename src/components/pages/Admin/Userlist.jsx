import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaLock, FaUnlock, FaPlus } from 'react-icons/fa';
import UserFormModal from './UserFormModal';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

const UserList = () => {
  // Khai báo các state để quản lý người dùng, trạng thái modal và người dùng đã chọn
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Hàm này sẽ được gọi khi component được mount để lấy danh sách người dùng
  useEffect(() => {
    fetchUsers();
  }, []);

  // Hàm để gọi API lấy danh sách người dùng
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token'); // Lấy token từ localStorage
      const response = await axios.get('http://localhost:5000/api/auth/users', {
        headers: {
          'x-auth-token': token, // Gửi token trong header để xác thực
        },
      });
      setUsers(response.data); // Cập nhật state người dùng
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Lỗi khi tải danh sách người dùng'); // Hiển thị thông báo lỗi
    }
  };

  // Hàm để mở modal để tạo mới người dùng
  const handleCreateUser = () => {
    setSelectedUser(null); // Đặt selectedUser là null khi tạo mới
    setIsModalOpen(true); // Mở modal
  };

  // Hàm để mở modal và chỉnh sửa người dùng
  const handleEditUser = (user) => {
    setSelectedUser(user); // Đặt người dùng được chọn
    setIsModalOpen(true); // Mở modal
  };

  // Hàm để lưu thông tin người dùng mới hoặc cập nhật người dùng đã tồn tại
  const handleSaveUser = async (data) => {
    try {
      const token = localStorage.getItem('token'); // Lấy token từ localStorage
      let response;
      if (selectedUser) {
        // Nếu có người dùng được chọn, cập nhật thông tin người dùng
        response = await axios.put(`http://localhost:5000/api/auth/users/${selectedUser._id}`, data, {
          headers: {
            'x-auth-token': token, // Gửi token trong header để xác thực
          },
        });
        setUsers(users.map(user => (user._id === selectedUser._id ? response.data : user))); // Cập nhật danh sách người dùng
        toast.success('Cập nhật người dùng thành công'); // Hiển thị thông báo thành công
      } else {
        // Nếu không có người dùng được chọn, tạo mới người dùng
        response = await axios.post('http://localhost:5000/api/auth/users', data, {
          headers: {
            'x-auth-token': token, // Gửi token trong header để xác thực
          },
        });
        setUsers([...users, response.data]); // Thêm người dùng mới vào danh sách
        toast.success('Tạo người dùng mới thành công'); // Hiển thị thông báo thành công
      }
      setIsModalOpen(false); // Đóng modal
    } catch (error) {
      console.error('Error saving user:', error.response || error.message);
      toast.error('Lỗi khi lưu người dùng'); // Hiển thị thông báo lỗi
    }
  };

  // Hàm để xóa người dùng
  const handleDeleteUser = async (id) => {
    try {
      const token = localStorage.getItem('token'); // Lấy token từ localStorage
      await axios.delete(`http://localhost:5000/api/auth/users/${id}`, {
        headers: {
          'x-auth-token': token, // Gửi token trong header để xác thực
        },
      });
      setUsers(users.filter(user => user._id !== id)); // Xóa người dùng khỏi danh sách
      toast.success('Xóa người dùng thành công'); // Hiển thị thông báo thành công
    } catch (error) {
      console.error('Error deleting user:', error.response || error.message);
      toast.error('Lỗi khi xóa người dùng'); // Hiển thị thông báo lỗi
    }
  };

  // Hàm để khóa/mở khóa người dùng
  const handleToggleLockUser = async (id) => {
    const user = users.find(user => user._id === id); // Tìm người dùng cần thay đổi trạng thái
    try {
      const token = localStorage.getItem('token'); // Lấy token từ localStorage
      const response = await axios.put(`http://localhost:5000/api/auth/users/${id}/lock`, null, {
        headers: {
          'x-auth-token': token, // Gửi token trong header để xác thực
        },
      });
      setUsers(users.map(user => (user._id === id ? { ...user, locked: !user.locked } : user))); // Cập nhật trạng thái khóa
      toast.success(`Người dùng đã được ${response.data.locked ? 'khóa' : 'mở khóa'}`); // Hiển thị thông báo thành công
    } catch (error) {
      console.error('Error toggling user lock:', error.response || error.message);
      toast.error('Lỗi khi thay đổi trạng thái khóa'); // Hiển thị thông báo lỗi
    }
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
            <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-50 transition duration-150 ease-in-out">
              <td className="py-3 px-4">{user.employeeId}</td>
              <td className="py-3 px-4">{user.username}</td>
              <td className="py-3 px-4">{user.name}</td>
              <td className="py-3 px-4">{user.email}</td>
              <td className="py-3 px-4">{user.role}</td>
              <td className="py-3 px-4 flex justify-center">
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
                  onClick={() => handleDeleteUser(user._id)}
                >
                  <FaTrash />
                </button>
                <button
                  className="text-gray-600 hover:text-gray-800 mx-2"
                  title={user.locked ? 'Mở khóa' : 'Khóa'}
                  onClick={() => handleToggleLockUser(user._id)}
                >
                  {user.locked ? <FaUnlock /> : <FaLock />}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal để tạo mới hoặc chỉnh sửa người dùng */}
      {isModalOpen && (
        <UserFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveUser}
          initialData={selectedUser}
        />
      )}
      <ToastContainer /> {/* Hiển thị các thông báo */}
    </div>
  );
};

export default UserList;
