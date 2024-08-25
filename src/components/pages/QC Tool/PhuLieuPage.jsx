// src/components/PhuLieuCatalog.jsx
import React, { useState, useEffect } from 'react';
import DynamicFormModal from '../../../libs/consts/DynamicFormModal';
import ExportExcelButton from '../../../libs/consts/ExportExcelButton';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

const PhuLieuCatalog = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [externalSample, setExternalSample] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
  const [allItems, setAllItems] = useState([]);

  const formFields = [
    { name: 'status', label: 'Trạng thái', placeholder: 'Nhập trạng thái', type: 'text' },
    { name: 'nCode', label: 'Mã vật liệu', placeholder: 'Nhập mã vật liệu', type: 'text' },
    { name: 'material', label: 'Tên vật liệu', placeholder: 'Nhập tên vật liệu', type: 'text' },
    { name: 'type', label: 'Loại', placeholder: 'Nhập loại', type: 'text' },
    { name: 'unit', label: 'Đơn vị', placeholder: 'Nhập đơn vị', type: 'text' },
    { name: 'manufacturer', label: 'Nhà sản xuất', placeholder: 'Nhập nhà sản xuất', type: 'text' },
    { name: 'country', label: 'Quốc gia', placeholder: 'Nhập quốc gia', type: 'text' },
    { name: 'externalSample', label: 'Gửi mẫu ngoài', placeholder: '', type: 'checkbox' },
  ];

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/phulieu');
      const data = await response.json();
      setFilteredItems(data);
      setAllItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleSearch = () => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = allItems.filter(item =>
      item.status.toLowerCase().includes(lowercasedSearchTerm) ||
      item.nCode.toLowerCase().includes(lowercasedSearchTerm) ||
      item.material.toLowerCase().includes(lowercasedSearchTerm)
    );
    setFilteredItems(filtered);
  };

  const handleCreate = () => {
    setInitialData(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setInitialData(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/phulieu/${id}`, { method: 'DELETE' });
      toast.success('Xóa phụ liệu thành công');
      fetchItems(); // Refresh items after deletion
    } catch (error) {
      toast.error('Error deleting item');
      console.error('Error deleting item:', error);
    }
  };

  const onSave = async (data) => {
    try {
      const method = initialData ? 'PUT' : 'POST';
      const url = initialData
        ? `http://localhost:5000/api/phulieu/${initialData._id}`
        : 'http://localhost:5000/api/phulieu';
      
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      toast.success('Lưu thành phụ liệu thành công');
      fetchItems(); // Refresh items after save
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Error saving item');
      console.error('Error saving item:', error);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm"
          className="border px-4 py-2 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleSearch}>
          Tìm kiếm
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={handleCreate}>
          Thêm mới
        </button>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="externalSample"
            checked={externalSample}
            onChange={(e) => setExternalSample(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="externalSample">Gửi mẫu ngoài</label>
        </div>
        <div className="flex-grow"></div> {/* Đẩy nút xuất excel sang bên phải */}
        <ExportExcelButton data={filteredItems} />
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-xs">STT</th>
            <th className="border px-4 py-2 text-xs">Trạng thái</th>
            <th className="border px-4 py-2 text-xs">Mã vật liệu</th>
            <th className="border px-4 py-2 text-xs">Tên phụ liệu</th>
            <th className="border px-4 py-2 text-xs">Loại</th>
            <th className="border px-4 py-2 text-xs">Đơn vị</th>
            <th className="border px-4 py-2 text-xs">Nhà sản xuất</th>
            <th className="border px-4 py-2 text-xs">Quốc gia</th>
            <th className="border px-4 py-2 text-xs">Gửi mẫu ngoài</th>
            <th className="border px-4 py-2 text-xs">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item, index) => (
            <tr key={item._id}>
              <td className="border px-4 py-2 text-xs">{index + 1}</td>
              <td className="border px-4 py-2 text-xs">{item.status}</td>
              <td className="border px-4 py-2 text-xs">{item.nCode}</td>
              <td className="border px-4 py-2 text-xs">{item.material}</td>
              <td className="border px-4 py-2 text-xs">{item.type}</td>
              <td className="border px-4 py-2 text-xs">{item.unit}</td>
              <td className="border px-4 py-2 text-xs">{item.manufacturer}</td>
              <td className="border px-4 py-2 text-xs">{item.country}</td>
              <td className="border px-4 py-2 text-xs text-center">
                <input
                  type="checkbox"
                  checked={item.externalSample}
                  readOnly
                />
              </td>
              <td className="py-2 px-4 text-center border ">
                <button 
                   onClick={() => handleEdit(item)}
                  className="text-blue-500 cursor-pointer mr-2">
                    <AiFillEdit                  
                  />                  
                </button>
                <button  onClick={() => handleDelete(item._id)}
                  className="text-red-500 cursor-pointer">
                    <AiFillDelete
                 
                 />

                </button>
                
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DynamicFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={onSave}
        initialData={initialData}
        formFields={formFields}
      />
      <ToastContainer />
    </div>
  );
};

export default PhuLieuCatalog;
