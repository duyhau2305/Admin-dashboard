import React, { useState, useEffect } from 'react';
import { FaEye, FaEdit, FaTrash, FaLock, FaUnlock, FaPlus } from 'react-icons/fa';


const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newUser, setNewUser] = useState({
    employeeId: '',
    name: '',
    email: '',
    password: '',
    role: 'Production',
    locked: false
  });

  useEffect(() => {
    fetchUsers().then(data => setUsers(data));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prevState => ({ ...prevState, [name]: value }));
  };

  const handleCreateUser = () => {
    createUser(newUser).then(user => {
      setUsers([...users, user]);
      setIsCreating(false);
    });
  };

  const handleDeleteUser = (id) => {
    deleteUser(id).then(() => {
      setUsers(users.filter(user => user.id !== id));
    });
  };

  const handleToggleLockUser = (id) => {
    toggleLockUser(id, users).then(updatedUser => {
      setUsers(users.map(user => (user.id === id ? updatedUser : user)));
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Quản Lý Người Dùng</h1>
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded-md flex items-center hover:bg-blue-700"
          onClick={() => setIsCreating(true)}
        >
          <FaPlus className="mr-2" /> Tạo Tài Khoản
        </button>
      </div>

      {isCreating && (
        <div className="mb-6 bg-gray-100 p-4 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Tạo Tài Khoản Mới</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Mã Nhân Viên</label>
            <input
              type="text"
              name="employeeId"
              value={newUser.employeeId}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Tên</label>
            <input
              type="text"
              name="name"
              value={newUser.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Mật Khẩu</label>
            <input
              type="password"
              name="password"
              value={newUser.password}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Vai trò</label>
            <select
              name="role"
              value={newUser.role}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="Production">Sản xuất</option>
              <option value="QA">QA</option>
              <option value="QC">QC</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              className="bg-green-600 text-white py-2 px-4 rounded-md mr-2 hover:bg-green-700"
              onClick={handleCreateUser}
            >
              Tạo
            </button>
            <button
              className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
              onClick={() => setIsCreating(false)}
            >
              Hủy
            </button>
          </div>
        </div>
      )}

      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-300">
            <th className="py-3 px-4 text-left">Mã Nhân Viên</th>
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
              <td className="py-3 px-4">{user.name}</td>
              <td className="py-3 px-4">{user.email}</td>
              <td className="py-3 px-4">{user.role}</td>
              <td className="py-3 px-4 flex justify-center">
                <button className="text-blue-600 hover:text-blue-800 mx-2" title="Xem">
                  <FaEye />
                </button>
                <button className="text-green-600 hover:text-green-800 mx-2" title="Sửa">
                  <FaEdit />
                </button>
                <button className="text-red-600 hover:text-red-800 mx-2" title="Xóa" onClick={() => handleDeleteUser(user.id)}>
                  <FaTrash />
                </button>
                <button
                  className="text-gray-600 hover:text-gray-800 mx-2"
                  title={user.locked ? "Mở khóa" : "Khóa"}
                  onClick={() => handleToggleLockUser(user.id)}
                >
                  {user.locked ? <FaUnlock /> : <FaLock />}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  );
};

// Giả sử fetchUsers, createUser, deleteUser, và toggleLockUser là các hàm giả lập gọi API
const fetchUsers = async () => {
  return [
    { id: 1, employeeId: '001', name: 'Nguyen Van A', email: 'a@example.com', role: 'Production', locked: false },
    { id: 2, employeeId: '002', name: 'Tran Thi B', email: 'b@example.com', role: 'QA', locked: true },
  ];
};

const createUser = async (user) => {
  const newUser = { ...user, id: Date.now() };
  return newUser;
};

const deleteUser = async (id) => {
  return true;
};

const toggleLockUser = async (id, users) => {
  const user = users.find(u => u.id === id);
  user.locked = !user.locked;
  return user;
};

export default UserList;
