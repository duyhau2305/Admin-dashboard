import React, { useState } from 'react';

function Settings() {
  // Khai báo các biến state cho các toggle và cài đặt
  const [syncAccount, setSyncAccount] = useState('duyhau2305@gmail.com');
  const [storageUsage, setStorageUsage] = useState('15.00G');
  const [dataUsage, setDataUsage] = useState('1.05G');
  const [showRecentEpisodes, setShowRecentEpisodes] = useState(true);
  const [darkMode, setDarkMode] = useState(false); // Thêm trạng thái cho Dark Mode

  // Hàm xử lý khi người dùng thay đổi trạng thái của Dark Mode
  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode); // Đảo ngược trạng thái Dark Mode
  };

  return (
    <div className="bg-gray-100 p-4 min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-4 max-w-sm mx-auto">
        <h1 className="text-lg font-semibold border-b pb-2">Settings</h1>
        
        {/* Sync Account */}
        <div className="py-3 border-b">
          <div className="flex justify-between">
            <span>Sync</span>
            <span>{syncAccount}</span>
          </div>
        </div>
        
        {/* Storage Usage */}
        <div className="py-3 border-b">
          <div className="flex justify-between">
            <span>Storage</span>
            <span>{storageUsage}</span>
          </div>
        </div>
        
        {/* Data Usage */}
        <div className="py-3 border-b">
          <div className="flex justify-between">
            <span>Data Usage</span>
            <span>{dataUsage}</span>
          </div>
        </div>
        
        {/* Notification Toggle */}
        <div className="py-3 border-b">
          <div className="flex justify-between">
            <span>Notification</span>
            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
              <input
                type="checkbox"
                name="toggleNotification"
                id="toggleNotification"
                checked={showRecentEpisodes}
                onChange={() => setShowRecentEpisodes(!showRecentEpisodes)}
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              />
              <label
                htmlFor="toggleNotification"
                className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
              ></label>
            </div>
          </div>
        </div>

        {/* Dark Mode Toggle */}
        <div className="py-3 border-b">
          <div className="flex justify-between">
            <span>Dark mode</span>
            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
              <input
                type="checkbox"
                name="toggleDarkMode"
                id="toggleDarkMode"
                checked={darkMode}
                onChange={handleDarkModeToggle}
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              />
              <label
                htmlFor="toggleDarkMode"
                className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
              ></label>
            </div>
          </div>
        </div>

        {/* Rest of the settings */}
        {/* ... */}
        
      </div>
    </div>
  );
}

export default Settings;
