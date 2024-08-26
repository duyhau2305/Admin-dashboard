import React, { useState, useEffect } from 'react';
import DynamicFormModal from '../../../libs/consts/DynamicFormModal';
import ExportExcelButton from '../../../libs/consts/ExportExcelButton';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import FormatDate from '../../../libs/consts/FormatDate';

const SamplingComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [allItems, setAllItems] = useState([]);

  const formFields = [
    { name: 'date', label: 'Ngày', placeholder: 'Chọn ngày', type: 'date' },
    { name: 'user', label: 'Người lấy mẫu', placeholder: 'Nhập tên người lấy mẫu', type: 'text' },
    { name: 'status', label: 'Trạng thái', placeholder: 'Nhập trạng thái', type: 'text' },
    { name: 'material', label: 'Vật liệu', placeholder: 'Nhập vật liệu', type: 'text' },
    { name: 'lotNumber', label: 'Số lô', placeholder: 'Nhập số lô', type: 'text' },
    { name: 'kNumber', label: 'Số K', placeholder: 'Nhập số K', type: 'text' },
    { name: 'weight', label: 'Khối lượng', placeholder: 'Nhập khối lượng', type: 'text' },
    { name: 'packaging', label: 'Bao bì', placeholder: 'Nhập bao bì', type: 'text' },
    { name: 'productionDate', label: 'Ngày sản xuất', placeholder: 'Chọn ngày sản xuất', type: 'date' },
    { name: 'expiryDate', label: 'Ngày hết hạn', placeholder: 'Chọn ngày hết hạn', type: 'date' },
    { name: 'manufacturer', label: 'Nhà sản xuất', placeholder: 'Nhập nhà sản xuất', type: 'text' },
    { name: 'supplier', label: 'Nhà cung cấp', placeholder: 'Nhập nhà cung cấp', type: 'text' }
  ];

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/laymauphulieu');
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
      item.material.toLowerCase().includes(lowercasedSearchTerm) ||
      item.user.toLowerCase().includes(lowercasedSearchTerm)
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
      await fetch(`http://localhost:5000/api/laymauphulieu/${id}`, { method: 'DELETE' });
      toast.success('Xóa thành công');
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
        ? `http://localhost:5000/api/laymauphulieu/${initialData._id}`
        : 'http://localhost:5000/api/laymauphulieu';
      
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      toast.success('Lưu thành công');
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
        <div className="flex-grow"></div> {/* Đẩy nút xuất excel sang bên phải */}
        <ExportExcelButton data={filteredItems} />
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-2 text-xs">STT</th>
            <th className="border px-2 py-2 text-xs">Ngày</th>
            <th className="border px-4 py-2 whitespace-nowrap text-xs">Người lấy mẫu</th>
            <th className="border px-4 py-2 whitespace-nowrap text-xs">Trạng thái</th>
            <th className="border px-4 py-2 whitespace-nowrap text-xs">Vật liệu</th>
            <th className="border px-4 py-2 whitespace-nowrap text-xs">Số lô</th>
            <th className="border px-4 py-2 whitespace-nowrap text-xs">Số K</th>
            <th className="border px-4 py-2 whitespace-nowrap text-xs">Khối lượng</th>
            <th className="border px-4 py-2 text-xs whitespace-nowrap">Bao bì</th>
            <th className="border px-4 py-2 text-xs whitespace-nowrap">Ngày sản xuất</th>
            <th className="border px-4 py-2 text-xs whitespace-nowrap">Ngày hết hạn</th>
            <th className="border px-4 py-2 whitespace-nowrap text-xs">Nhà sản xuất</th>
            <th className="border px-4 py-2 whitespace-nowrap text-xs">Nhà cung cấp</th>
            <th className="border px-4 py-2 whitespace-nowrap text-xs">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item, index) => (
            <tr key={item._id}>
              <td className="border px-4 py-2 text-xs">{index + 1}</td>
              <td className="border px-4 py-2 text-xs"><FormatDate date={item.date}/></td>
              <td className="border px-4 py-2 text-xs">{item.user}</td>
              <td className="border px-4 py-2 text-xs">{item.status}</td>
              <td className="border px-4 py-2 text-xs">{item.material}</td>
              <td className="border px-4 py-2 text-xs">{item.lotNumber}</td>
              <td className="border px-4 py-2 text-xs">{item.kNumber}</td>
              <td className="border px-4 py-2 text-xs">{item.weight}</td>
              <td className="border px-4 py-2 text-xs">{item.packaging}</td>
              <td className="border px-4 py-2 text-xs"><FormatDate date={item.productionDate}/></td>
              <td className="border px-4 py-2 text-xs"><FormatDate date={item.expiryDate}/></td>
              <td className="border px-4 py-2 text-xs">{item.manufacturer}</td>
              <td className="border px-4 py-2 text-xs">{item.supplier}</td>
              <td className="py-2 px-4 text-center border">
                <button 
                   onClick={() => handleEdit(item)}
                  className="text-blue-500 cursor-pointer mr-2">
                    <AiFillEdit />                  
                </button>
                <button  onClick={() => handleDelete(item._id)}
                  className="text-red-500 cursor-pointer">
                    <AiFillDelete />
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

export default SamplingComponent;
