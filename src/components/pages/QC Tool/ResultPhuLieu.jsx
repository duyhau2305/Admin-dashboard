import React, { useState, useEffect } from 'react';
import DynamicFormModal from '../../../libs/consts/DynamicFormModal'; // Adjust the path if needed
import ExportExcelButton from '../../../libs/consts/ExportExcelButton'; // Adjust the path if needed
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

const ResultPhuLieu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [kNumberInput, setKNumberInput] = useState('');

  const handleSearch = () => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = filteredData.filter(item =>
      item.kNumber.toLowerCase().includes(lowercasedSearchTerm) ||
      item.material.toLowerCase().includes(lowercasedSearchTerm)
    );
    setFilteredData(filtered);
  };

  const handleKNumberChange = async (event) => {
    const selectedKNumber = event.target.value;
    setKNumberInput(selectedKNumber);

    // Fetch the data based on the selected kNumber
    try {
      const response = await fetch(`http://localhost:5000/api/laymauphulieu/kNumber/${selectedKNumber}`);
      const data = await response.json();

      if (response.ok) {
        setInitialData({
          kNumber: data.kNumber,
          material: data.material,
          lotNumber: data.lotNumber,
          productionDate: data.productionDate,
          expiryDate: data.expiryDate,
          weight: data.weight,
          user: data.user,
          status: data.status, // Assuming 'status' is also returned in the response
          packaging: data.packaging, // Assuming 'packaging' is also returned in the response
          manufacturer: data.manufacturer,
          supplier: data.supplier,
        });
      } else {
        toast.error(`Không tìm thấy dữ liệu cho Số K: ${selectedKNumber}`);
      }
    } catch (error) {
      console.error('Error fetching data for kNumber:', error);
      toast.error('Có lỗi xảy ra khi tải dữ liệu');
    }
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
          {/* Render rows here, assuming filteredData contains the items */}
        </tbody>
      </table>
      <DynamicFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={initialData}
        formFields={[
          { name: 'status', label: 'Trạng thái', placeholder: 'Nhập trạng thái', type: 'text' },
          {
            name: 'kNumber',
            label: 'Số K',
            placeholder: 'Nhập số K',
            type: 'text',
            value: kNumberInput,
            onChange: handleKNumberChange,
          },
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
        ]}
      />
      <ToastContainer />
    </div>
  );
};

export default ResultPhuLieu;
