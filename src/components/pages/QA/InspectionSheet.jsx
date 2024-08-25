import React, { useState, useEffect } from 'react';
import DynamicFormModal from '../../../libs/consts/DynamicFormModal';
import ExportExcelButton from '../../../libs/consts/ExportExcelButton';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

const InspectionSheet = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSheets, setFilteredSheets] = useState([]);
  const formFields = [
    { name: 'product', label: 'Sản phẩm', placeholder: 'Nhập tên sản phẩm', type: 'text' },
    { name: 'productCode', label: 'Mã sản phẩm', placeholder: 'Nhập mã sản phẩm', type: 'text' },
    { name: 'batchNumber', label: 'Số lô', placeholder: 'Nhập số lô', type: 'text' },
    { name: 'file', label: 'File', placeholder: 'Chọn file', type: 'file' },
    { name: 'printed', label: 'Đã in', placeholder: 'Nhập số lượng in', type: 'text' },
    { name: 'createdBy', label: 'Người tạo', placeholder: 'Nhập tên người tạo', type: 'text' },
    { name: 'createdAt', label: 'Thời gian tạo', placeholder: 'Chọn thời gian', type: 'datetime-local' },
  ];

  useEffect(() => {
    fetchSheets();
  }, []);

  const fetchSheets = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/inspection-sheets');
      const data = await response.json();
      setFilteredSheets(data);
    } catch (error) {
      console.error('Error fetching sheets:', error);
    }
  };

  const handleSearch = () => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = filteredSheets.filter(sheet =>
      sheet.product.toLowerCase().includes(lowercasedSearchTerm) ||
      sheet.productCode.toLowerCase().includes(lowercasedSearchTerm)
    );
    setFilteredSheets(filtered);
  };

  const handleCreate = () => {
    setInitialData(null);
    setIsModalOpen(true);
  };

  const handleSave = async (data) => {
    try {
      let filePath = data.file;

      if (data.file && data.file instanceof File) {
        const formData = new FormData();
        formData.append('file', data.file);

        const response = await fetch('http://localhost:5000/api/files/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          filePath = result.filePath;
        } else {
          throw new Error('File upload failed');
        }
      }

      const requestData = { ...data, file: filePath };

      if (initialData) {
        await fetch(`http://localhost:5000/api/inspection-sheets/${initialData._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });
        toast.success('Cập nhật phiếu kiểm nghiệm thành công!');
      } else {
        await fetch('http://localhost:5000/api/inspection-sheets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });
        toast.success('Tạo phiếu kiểm nghiệm mới thành công!');
      }

      setIsModalOpen(false);
      fetchSheets();
    } catch (error) {
      console.error('Error saving sheet:', error);
      toast.error('Lưu phiếu kiểm nghiệm thất bại!');
    }
  };

  const handleEdit = (id) => {
    const sheet = filteredSheets.find(sheet => sheet._id === id);
    setInitialData(sheet);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/inspection-sheets/${id}`, { method: 'DELETE' });
      toast.success('Xóa phiếu kiểm nghiệm thành công!');
      fetchSheets();
    } catch (error) {
      console.error('Error deleting sheet:', error);
      toast.error('Xóa phiếu kiểm nghiệm thất bại!');
    }
  };

  return (
    <div className="p-4">
      <ToastContainer />
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Tên sản phẩm | Mã sản phẩm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border py-2 rounded-md px-4"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleSearch}
        >
          Tìm kiếm
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md"
          onClick={handleCreate}
        >
          Tạo phiếu
        </button>
        <div className="flex-grow"></div>
        <ExportExcelButton
          data={filteredSheets}
          parentComponentName="InspectionSheets"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="py-2 px-4 text-left">STT</th>
              <th className="py-2 px-4 text-left">Sản phẩm</th>
              <th className="py-2 px-4 text-left">Mã sản phẩm</th>
              <th className="py-2 px-4 text-left">Số lô</th>
              <th className="py-2 px-4 text-left">File</th>
              <th className="py-2 px-4 text-left">Đã in</th>
              <th className="py-2 px-4 text-left">Người tạo</th>
              <th className="py-2 px-4 text-left">Thời gian tạo</th>
              <th className="py-2 px-4 text-left">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredSheets.map((sheet, index) => (
              <tr key={sheet._id} className="border-b border-gray-200">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{sheet.product}</td>
                <td className="py-2 px-4">{sheet.productCode}</td>
                <td className="py-2 px-4">{sheet.batchNumber}</td>
                <td className="py-2 px-4">
                  <a href={`/${sheet.file}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                    Xem file
                  </a>
                </td>
                <td className="py-2 px-4">{sheet.printed}</td>
                <td className="py-2 px-4">{sheet.createdBy}</td>
                <td className="py-2 px-4">{sheet.createdAt}</td>
                <td className="py-2 px-4 text-center border">
                  <button
                    onClick={() => handleEdit(sheet._id)}
                    className="px-2 py-1 text-blue-500 rounded hover:text-blue-600"
                  >
                    <AiFillEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(sheet._id)}
                    className="px-2 py-1 text-red-500 rounded hover:text-red-600"
                  >
                    <AiFillDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DynamicFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        formFields={formFields}
        contentLabel="Phiếu Kiểm Nghiệm"
        initialData={initialData}
      />
    </div>
  );
};

export default InspectionSheet;
