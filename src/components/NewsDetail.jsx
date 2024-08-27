import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const NewsDetail = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [news, setNews] = useState(null); // State để lưu trữ chi tiết tin tức
  const [loading, setLoading] = useState(true); // State để quản lý trạng thái tải dữ liệu
  const [error, setError] = useState(null); // State để lưu trữ lỗi nếu có

  // Gọi API để lấy dữ liệu chi tiết tin tức khi component được mount
  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/news/${id}`); // Gọi API với ID
        setNews(response.data); // Lưu dữ liệu vào state
      } catch (error) {
        setError('Có lỗi xảy ra khi tải tin tức'); // Xử lý lỗi nếu có
      } finally {
        setLoading(false); // Kết thúc trạng thái tải dữ liệu
      }
    };

    fetchNewsDetail();
  }, [id]); // Chạy lại effect nếu ID thay đổi

  // Kiểm tra trạng thái tải dữ liệu và lỗi
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Đang tải tin tức...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-blue-700 text-white p-6 shadow-lg">
        <h1 className="text-4xl font-extrabold">Chi Tiết Tin Tức</h1>
      </header>
      <main className="flex-grow p-6">
        {news && (
          <div className="bg-white p-6 mb-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">{news.title}</h2>
            <p className="text-gray-600">{news.content}</p>
          </div>
        )}
      </main>
      <footer className="bg-blue-700 text-white p-4 text-center mt-auto">
        &copy; 2024 Công ty Dược phẩm
      </footer>
    </div>
  );
};

export default NewsDetail;
