import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode }from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('guest'); // Default to 'guest' if not authenticated

  useEffect(() => {
    const updateAuthState = () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          console.log('Decoded Token:', decodedToken); // Debug: Xem thông tin token đã giải mã

          // Xác định vai trò dựa trên giá trị của isAdmin
          const userRole = decodedToken?.user?.isAdmin ? 'admin' : 'user'; 
          setIsAuthenticated(true);
          setRole(userRole);
        } catch (error) {
          console.error("Error decoding token:", error);
          setIsAuthenticated(false);
          setRole('guest');
        }
      } else {
        setIsAuthenticated(false);
        setRole('guest');
      }
    };

    // Gọi hàm để cập nhật ngay khi component được mount
    updateAuthState();

    // Lắng nghe sự thay đổi của token trong localStorage
    window.addEventListener('storage', updateAuthState);

    return () => {
      window.removeEventListener('storage', updateAuthState);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, setIsAuthenticated, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};
