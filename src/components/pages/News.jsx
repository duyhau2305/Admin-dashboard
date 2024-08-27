import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Giả sử bạn đang sử dụng React Router

const News = () => {
  const [newsData, setNewsData] = useState([]); // State để lưu trữ dữ liệu tin tức
  const [currentPage, setCurrentPage] = useState(1); // State để quản lý trang hiện tại
  const [loading, setLoading] = useState(true); // State để quản lý trạng thái tải dữ liệu
  const [error, setError] = useState(null); // State để lưu trữ lỗi nếu có

  const itemsPerPage = 3; // Số lượng tin tức mỗi trang
  const totalPages = Math.ceil(newsData.length / itemsPerPage); // Tổng số trang dựa trên số tin tức

  // Gọi API để lấy dữ liệu tin tức khi component được mount
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/news'); // Thay URL bằng URL API thực tế
        setNewsData(response.data);
      } catch (error) {
        setError('Có lỗi xảy ra khi tải tin tức'); // Xử lý lỗi
      } finally {
        setLoading(false); // Kết thúc trạng thái tải dữ liệu
      }
    };

    fetchNews();
  }, []);

  // Xử lý chuyển trang
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return; // Ngăn chuyển đến trang không hợp lệ
    setCurrentPage(page);
  };

  // Hàm để cắt ngắn nội dung tin tức
  const truncateContent = (content, length) => {
    return content.length > length ? content.substring(0, length) + '...' : content;
  };

  // Tính toán các tin tức hiện tại dựa trên trang
  const currentNews = newsData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
        <h1 className="text-4xl font-extrabold">Công ty Dược phẩm WinPharma- Trang Tin Tức Nội Bộ</h1>
      </header>
      <main className="flex-grow p-6">
        {currentNews.map(news => (
          <div key={news._id} className="bg-white p-6 mb-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              <Link to={`/news/${news._id}`} className="hover:underline">
                {news.title}
              </Link>
            </h2>
            <p className="text-gray-600">{truncateContent(news.content, 100)}</p> {/* Cắt ngắn nội dung tin tức */}
            <Link to={`/news/${news._id}`} className="text-blue-500 hover:underline mt-2 inline-block">Đọc thêm</Link>
          </div>
        ))}
        <div className="flex justify-center mt-6">
          <button 
            onClick={() => handlePageChange(currentPage - 1)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mx-1 disabled:bg-gray-400"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="mx-2">{currentPage} / {totalPages}</span>
          <button 
            onClick={() => handlePageChange(currentPage + 1)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mx-1 disabled:bg-gray-400"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </main>
      <footer className="bg-blue-700 text-white p-4 text-center mt-auto">
        &copy; 2024 Công ty Dược phẩm
      </footer>
    </div>
  );
};

export default News;
