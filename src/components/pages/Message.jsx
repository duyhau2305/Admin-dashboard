import React, { useState } from 'react';

const Message = () => {
  const newsData = [
    { id: 1, title: "Tin tức 1", content: "Nội dung tin tức 1..." },
    { id: 2, title: "Tin tức 2", content: "Nội dung tin tức 2..." },
    { id: 3, title: "Tin tức 3", content: "Nội dung tin tức 3..." },
    { id: 4, title: "Tin tức 4", content: "Nội dung tin tức 4..." },
    { id: 5, title: "Tin tức 5", content: "Nội dung tin tức 5..." },
    { id: 6, title: "Tin tức 6", content: "Nội dung tin tức 6..." },
    { id: 7, title: "Tin tức 7", content: "Nội dung tin tức 7..." },
    { id: 8, title: "Tin tức 8", content: "Nội dung tin tức 8..." },
    // Thêm nhiều tin tức hơn nếu cần
  ];

  const itemsPerPage = 3; // Number of news items per page
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(newsData.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return; // Prevent invalid page numbers
    setCurrentPage(page);
  };

  const currentNews = newsData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-blue-700 text-white p-6 shadow-lg">
        <h1 className="text-4xl font-extrabold">Công ty Dược phẩm - Trang Tin Tức Nội Bộ</h1>
      </header>
      <main className="flex-grow p-6">
        {currentNews.map(news => (
          <div key={news.id} className="bg-white p-6 mb-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">{news.title}</h2>
            <p className="text-gray-600">{news.content}</p>
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

export default Message;
