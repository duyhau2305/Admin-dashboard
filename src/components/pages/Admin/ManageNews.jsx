import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageNews = () => {
  const [newsData, setNewsData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch news data from API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/news'); // Gọi API để lấy dữ liệu tin tức
        setNewsData(response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };
    fetchNews();
  }, []);

  const handleEdit = (news) => {
    setEditId(news._id); // Lưu trữ id từ MongoDB
    setTitle(news.title);
    setContent(news.content);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editId === null) {
        // Add new news
        const response = await axios.post('http://localhost:5000/api/news', { title, content });
        setNewsData([...newsData, response.data]);
      } else {
        // Update existing news
        const response = await axios.put(`http://localhost:5000/api/news/${editId}`, { title, content });
        const updatedNews = newsData.map(news => {
          if (news._id === editId) {
            return response.data;
          }
          return news;
        });
        setNewsData(updatedNews);
      }

      // Reset states and close modal
      setEditId(null);
      setTitle('');
      setContent('');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving news:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/news/${id}`);
      setNewsData(newsData.filter(news => news._id !== id));
    } catch (error) {
      console.error('Error deleting news:', error);
    }
  };

  const handleAddNew = () => {
    setEditId(null);
    setTitle('');
    setContent('');
    setIsModalOpen(true);
  };

  return (
    <div className="admin-panel">
      <h1 className="text-3xl font-bold text-center my-4">Quản Lý Tin Tức</h1>
      {newsData.map(news => (
        <div key={news._id} className="bg-white p-4 mb-4 rounded shadow">
          <h2 className="text-xl font-semibold">{news.title}</h2>
          <p>{news.content}</p>
          <button onClick={() => handleEdit(news)} className="bg-yellow-500 text-white px-4 py-2 rounded mr-2 hover:bg-yellow-600">Sửa</button>
          <button onClick={() => handleDelete(news._id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">Xóa</button>
        </div>
      ))}
      <button onClick={handleAddNew} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">Thêm Tin Mới</button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">{editId ? 'Chỉnh Sửa Tin Tức' : 'Thêm Tin Tức Mới'}</h2>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Tiêu đề" 
              className="p-2 border rounded w-full mb-2"
            />
            <textarea 
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              placeholder="Nội dung" 
              className="p-2 border rounded w-full mb-2" 
              rows="4"
            ></textarea>
            <div className="flex justify-end">
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-700"
              >
                Hủy
              </button>
              <button 
                onClick={handleSave} 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageNews;
