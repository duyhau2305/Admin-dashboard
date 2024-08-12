import React, { useState } from 'react';

const ManageNews = () => {
  const [newsData, setNewsData] = useState([
    { id: 1, title: "Thông báo tuyển dụng", content: "Thông báo tuyển dụng Trưởng phòng Tổ chức Hành chính ..." },
    { id: 2, title: "Danh sách Cổ đông Nhà nước, Cổ đông lớn 6 tháng đầu năm 2024", content: "Danh sách Cổ đông Nhà nước, Cổ đông lớn 6 tháng đầu năm 202..." },
    // Thêm các tin tức khác
  ]);

  const [editId, setEditId] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (news) => {
    setEditId(news.id);
    setTitle(news.title);
    setContent(news.content);
    setIsModalOpen(true); // Open the modal when editing
  };

  const handleSave = () => {
    if (editId === null) {
      // Add new news
      const newNews = {
        id: newsData.length + 1, // Generate a new ID based on the length of the array
        title,
        content
      };
      setNewsData([...newsData, newNews]);
    } else {
      // Update existing news
      const updatedNews = newsData.map(news => {
        if (news.id === editId) {
          return { ...news, title, content };
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
  };

  const handleDelete = (id) => {
    setNewsData(newsData.filter(news => news.id !== id));
  };

  const handleAddNew = () => {
    setEditId(null);
    setTitle('');
    setContent('');
    setIsModalOpen(true); // Open the modal when adding new news
  };

  return (
    <div className="admin-panel">
      <h1 className="text-3xl font-bold text-center my-4">Quản Lý Tin Tức</h1>
      {newsData.map(news => (
        <div key={news.id} className="bg-white p-4 mb-4 rounded shadow">
          <h2 className="text-xl font-semibold">{news.title}</h2>
          <p>{news.content}</p>
          <button onClick={() => handleEdit(news)} className="bg-yellow-500 text-white px-4 py-2 rounded mr-2 hover:bg-yellow-600">Sửa</button>
          <button onClick={() => handleDelete(news.id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">Xóa</button>
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
