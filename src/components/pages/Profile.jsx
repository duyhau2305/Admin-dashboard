import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaCamera, FaSave, FaLock } from 'react-icons/fa';

function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [userInfo, setUserInfo] = useState({
    fullName: 'James Allan',
    email: 'james@example.com',
    phone: '+84 (123) 456-7890',
    bio: 'QC Staff | Nature Lover | Music Enthusiast',
  });
  const [username, setUsername] = useState('jamesallan');
  const [password, setPassword] = useState('********'); // Mật khẩu hiện tại
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    // Lấy thông tin người dùng từ localStorage khi trang được tải
    const savedUserInfo = localStorage.getItem('userInfo');
    if (savedUserInfo) {
      setUserInfo(JSON.parse(savedUserInfo));
    }

    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      setUsername(savedUsername);
    }

    const savedPassword = localStorage.getItem('password');
    if (savedPassword) {
      setPassword(savedPassword);
    }
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Thêm logic để lưu thông tin người dùng và thay đổi mật khẩu
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatarFile(file);
  };

  const handleEditProfileClick = () => {
    setIsEditing(true);
  };

  const handlePasswordChangeClick = () => {
    setIsChangingPassword(true);
  };

  const handleClosePasswordModal = () => {
    setIsChangingPassword(false);
    setNewPassword('');
    setConfirmPassword('');
    setPasswordError('');
  };

  const handlePasswordChange = () => {
    // Thêm logic để kiểm tra mật khẩu mới và xác nhận mật khẩu
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    // Thực hiện thay đổi mật khẩu ở đây (ví dụ: gửi yêu cầu đến máy chủ)
    // Sau khi thay đổi mật khẩu thành công, đặt lại các state và đóng modal.
    setPasswordError('');
    setIsChangingPassword(false);
    setPassword(newPassword);
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-white max-w-4xl mx-auto rounded-lg shadow-lg p-6">
        <div className="text-center relative">
          <div className="relative w-24 h-24 mx-auto bg-gray-300 rounded-full flex items-center justify-center">
            {avatarFile ? (
              <img
                src={URL.createObjectURL(avatarFile)}
                alt="Avatar"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <FaUserCircle className="text-5xl text-gray-500" />
            )}
            {isEditing && (
              <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full cursor-pointer">
                <label htmlFor="avatar" className="cursor-pointer">
                  <FaCamera />
                  <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </label>
              </div>
            )}
          </div>
          {isEditing && avatarFile && (
            <button
              onClick={() => setAvatarFile(null)}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full cursor-pointer"
            >
              Remove
            </button>
          )}
          {isEditing && (
            <button
              onClick={handleSaveClick}
              className="absolute bottom-0 left-0 bg-green-500 text-white p-1 rounded-full cursor-pointer"
            >
              <FaSave />
            </button>
          )}
        </div>
        <h1 className="text-2xl font-semibold mt-4">
          {isEditing ? (
            <input
              type="text"
              name="fullName"
              value={userInfo.fullName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-indigo-500"
            />
          ) : (
            userInfo.fullName
          )}
        </h1>
        <p className="text-gray-500">@{username}</p>

        <div className="mt-6">
          {isEditing ? (
            <form onSubmit={handleSaveClick}>
              <div className="mb-4">
                <label className="block text-gray-600 text-sm font-semibold mb-2">
                  Email
                </label>
                <p className="text-gray-800">{userInfo.email}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 text-sm font-semibold mb-2">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-indigo-500"
                />
              </div>
              {isChangingPassword ? (
                <>
                  <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-semibold mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-semibold mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  {passwordError && <p className="text-red-500">{passwordError}</p>}
                </>
              ) : (
                <div className="mb-4">
                  <label className="block text-gray-600 text-sm font-semibold mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    readOnly={true}
                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-indigo-500"
                  />
                </div>
              )}
              <div className="mb-4">
                <label className="block text-gray-600 text-sm font-semibold mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={userInfo.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 text-sm font-semibold mb-2">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={userInfo.bio}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border resize-none focus:outline-none focus:border-indigo-500"
                  rows="4"
                ></textarea>
              </div>
            </form>
          ) : (
            <>
              <div className="mb-4">
                <label className="block text-gray-600 text-sm font-semibold mb-2">
                  Email
                </label>
                <p className="text-gray-800">{userInfo.email}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 text-sm font-semibold mb-2">
                  Username
                </label>
                <p className="text-gray-800">{username}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 text-sm font-semibold mb-2">
                  Password
                </label>
                <p className="text-gray-800">{isChangingPassword ? '********' : password}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 text-sm font-semibold mb-2">
                  Phone
                </label>
                <p className="text-gray-800">{userInfo.phone}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 text-sm font-semibold mb-2">
                  Bio
                </label>
                <p className="text-gray-800">{userInfo.bio}</p>
              </div>
            </>
          )}
        </div>
        
        {!isEditing && (
          <div className="mt-6 space-x-4 text-center">
            <button
              onClick={handleEditProfileClick}
              className="bg-emerald-400 px-4 py-2 rounded-lg border text-white hover:bg-sky-500 focus:outline-none"
            >
              Edit Profile
            </button>
            <button
              onClick={handlePasswordChangeClick}
              className="bg-blue-400 px-4 py-2 rounded-lg border text-white hover:bg-blue-500 focus:outline-none"
            >
              Change Password
            </button>
          </div>
        )}

        {isChangingPassword && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white max-w-md mx-auto p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
              <div className="mb-4">
                <label htmlFor="newPassword" className="block text-gray-600 text-sm font-semibold mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-gray-600 text-sm font-semibold mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-indigo-500"
                />
              </div>
              {passwordError && <p className="text-red-500">{passwordError}</p>}
              <div className="flex justify-end">
                <button
                  onClick={handleClosePasswordModal}
                  className="mr-4 text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePasswordChange}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer"
                  >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
