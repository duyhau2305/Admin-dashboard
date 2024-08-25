import React, { useState } from 'react';
import DynamicFormModal from '../../../libs/consts/DynamicFormModal'; // Adjust the path if needed
import ExportExcelButton from '../../../libs/consts/ExportExcelButton'; // Adjust the path if needed
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

const ResultPhuLieu = () => {
  const fakeData = [
    {
      id: 1,
      status: 'Đã nhận',
      kNumber: 'BB23-362',
      material: 'Màng Cjel Bone 15g',
      lotNumber: 'M2',
      productionDate: '12/08/24',
      expiryDate: '12/08/25',
      weight: '40/40 (GAM)',
      statusSample: 'Nguyên liệu mới',
      file: 'aa.pdf',
      resultDate: '12-08-2024',
      placesample: 'Kho nguyên liệu',
      user: 'Nguyễn Ngọc Huyền',
      entryDate: '02-08-2024',
      action: '',
    },
    // Add more items if needed
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(fakeData);

  const formFields = [
    { name: 'status', label: 'Trạng thái', placeholder: 'Nhập trạng thái', type: 'text' },
    { name: 'kNumber', label: 'Số K', placeholder: 'Nhập số K', type: 'text' },
    { name: 'material', label: 'Phụ liệu', placeholder: 'Nhập tên phụ liệu', type: 'text' },
    { name: 'lotNumber', label: 'Số lô', placeholder: 'Nhập số lô', type: 'text' },
    { name: 'productionDate', label: 'Ngày sản xuất', placeholder: 'Chọn ngày sản xuất', type: 'date' },
    { name: 'expiryDate', label: 'Hạn dùng', placeholder: 'Chọn hạn dùng', type: 'date' },
    { name: 'weight', label: 'Lượng lấy', placeholder: 'Nhập lượng lấy', type: 'text' },
    { name: 'statusSample', label: 'Tình trạng mẫu', placeholder: 'Nhập tình trạng mẫu', type: 'text' },
    { name: 'file', label: 'File', placeholder: 'Chọn file', type: 'file' },
    { name: 'resultDate', label: 'Ngày trả KQ', placeholder: 'Chọn ngày trả KQ', type: 'date' },
    { name: 'placesample', label: 'Nơi lấy mẫu', placeholder: 'Nhập nơi lấy mẫu', type: 'text' },
    { name: 'user', label: 'Người lấy', placeholder: 'Nhập người lấy mẫu', type: 'text' },
    { name: 'entryDate', label: 'Ngày lấy', placeholder: 'Chọn ngày lấy', type: 'date' },
  ];

  const handleSearch = () => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = fakeData.filter(item =>
      item.kNumber.toLowerCase().includes(lowercasedSearchTerm) ||
      item.material.toLowerCase().includes(lowercasedSearchTerm)
    );
    setFilteredData(filtered);
  };

  const handleCreate = () => {
    setInitialData(null);
    setIsModalOpen(true);
  };

  const handleSave = async (data) => {
    // Implement the save functionality here
    console.log('Save data:', data);
    toast.success('Dữ liệu đã được lưu!');
    setIsModalOpen(false);
  };

  const handleEdit = (item) => {
    setInitialData(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    // Implement the delete functionality here
    console.log('Delete item with ID:', id);
    toast.success('Dữ liệu đã được xóa!');
  };

  return (
    <div className="p-2 bg-white shadow-md rounded-md">
      <div className="sticky left-0 bg-white z-10 p-2">
        <div className="flex items-center gap-2 mb-2">
          <input
            type="text"
            placeholder="Số K | Tên sản phẩm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-1 rounded-md text-xs px-2"
          />
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded-md text-xs"
            onClick={handleSearch}
          >
            Tìm kiếm
          </button>
          <button
            className="bg-green-500 text-white px-3 py-1 rounded-md text-xs"
            onClick={handleCreate}
          >
            Báo cáo
          </button>
          <div className="flex-grow"></div>
          <ExportExcelButton data={filteredData} fileName="ResultPhuLieuData" />
        </div>
      </div>
      <table className="w-full border-collapse text-xs">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-1 py-1 text-xs">STT</th>
            <th className="border whitespace-nowrap px-1 py-1 text-xs">Trạng thái</th>
            <th className="border whitespace-nowrap px-1 py-1 text-xs">Số K</th>
            <th className="border px-1 whitespace-nowrap py-1 text-xs">Phụ liệu</th>
            <th className="border px-1 whitespace-nowrap py-1 text-xs">Số lô</th>
            <th className="border px-1 whitespace-nowrap py-1 text-xs">Ngày sản xuất</th>
            <th className="border px-1 whitespace-nowrap py-1 text-xs">Hạn dùng</th>
            <th className="border px-1 whitespace-nowrap py-1 text-xs">Lượng lấy</th>
            <th className="border px-1 whitespace-nowrap py-1 text-xs">Tình trạng mẫu</th>
            <th className="border px-1 whitespace-nowrap py-1 text-xs">File</th>
            <th className="border px-1 whitespace-nowrap py-1 text-xs">Ngày trả KQ</th>
            <th className="border px-1 whitespace-nowrap py-1 text-xs">Nơi lấy mẫu</th>
            <th className="border px-1 whitespace-nowrap py-1 text-xs">Người lấy</th>
            <th className="border px-1 whitespace-nowrap py-1 text-xs">Ngày lấy</th>
            <th className="border px-1 whitespace-nowrap py-1 text-xs">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td className="border px-1 py-1 text-xs  whitespace-nowrap">{item.id}</td>
              <td className={`border px-1 py-1 text-xs whitespace-nowrap ${item.status === 'Chưa lấy mẫu' ? 'text-orange-600' : 'text-green-600'}`}>
                {item.status}
              </td>
              <td className="border px-1 py-1 text-xs whitespace-nowrap">{item.kNumber}</td>
              <td className="border px-1 py-1 text-xs whitespace-nowrap truncate max-w-xs">{item.material}</td>
              <td className="border px-1 py-1 text-xs whitespace-nowrap">{item.lotNumber}</td>
              <td className="border px-1 py-1 text-xs whitespace-nowrap">{item.productionDate}</td>
              <td className="border px-1 py-1 text-xs whitespace-nowrap">{item.expiryDate}</td>
              <td className="border px-1 py-1 text-xs whitespace-nowrap">{item.weight}</td>
              <td className="border px-1 py-1 text-xs whitespace-nowrap">{item.statusSample}</td>
              <td className="border px-1 py-1 text-xs whitespace-nowrap">{item.file}</td>
              <td className="border px-1 py-1 text-xs whitespace-nowrap">{item.resultDate}</td>
              <td className="border px-1 py-1 text-xs whitespace-nowrap">{item.placesample}</td>
              <td className="border px-1 py-1 text-xs whitespace-nowrap">{item.user}</td>
              <td className="border px-1 py-1 text-xs whitespace-nowrap">{item.entryDate}</td>
              <td className="border px-1 py-1 text-xs flex gap-2">
                <button onClick={() => handleEdit(item)}>
                  <AiFillEdit className="text-blue-500" />
                </button>
                <button onClick={() => handleDelete(item.id)}>
                  <AiFillDelete className="text-red-500" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DynamicFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={initialData}
        formFields={formFields}
      />
      <ToastContainer />
    </div>
  );
};

export default ResultPhuLieu;
