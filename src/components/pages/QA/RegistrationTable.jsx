import React, { useState } from 'react';
import ExportExcelButton from '../../../libs/consts/ExportExcelButton';
import DynamicFormModal from '../../../libs/consts/DynamicFormModal';
const registrations = [
  {
    id: '001',
    registrationNumber: 'QLSP-903-15',
    approvalNumber: '1901/24/CPC1HN-TC',
    registrationDate: '2024-01-15',
    expirationDate: '2025-01-15',
    product: 'coladin',
    category: 'Thực phẩm chức năng',
    status: 'Đã duyệt',
  },
  {
    id: '002',
    registrationNumber: 'RQLSP-903-15',
    approvalNumber: '2002/24/CPC1HN-TC',
    registrationDate: '2024-02-20',
    expirationDate: '2025-02-20',
    product: 'Colodin',
    category: 'Sinh phẩm',
    status: 'Đã duyệt',
  },
  // Thêm các số đăng ký khác ở đây
];

const RegistrationTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const formFields = [
    { name: 'registrationNumber', label: 'Số đăng ký', placeholder: 'Nhập số đăng ký' },
    { name: 'approvalNumber', label: 'Số công bố', placeholder: 'Nhập số công bố' },
    { name: 'registrationDate', label: 'Ngày đăng ký', type: 'date' },
    { name: 'expirationDate', label: 'Ngày hết hạn', type: 'date' },
    { name: 'product', label: 'Sản phẩm', placeholder: 'Nhập sản phẩm' },
    { name: 'category', label: 'Phân loại', placeholder: 'Nhập phân loại' },
    { name: 'status', label: 'Trạng thái', placeholder: 'Nhập trạng thái' },
  ];

  const handleSearch = () => {
    console.log('Tìm kiếm');
  };

  const handleAddNew = () => {
    setEditData(null); // Clear data for adding new
    setIsModalOpen(true);
  };

  const handleExportExcel = () => {
    console.log('Xuất Excel');
  };

  const handleEdit = (id) => {
    const dataToEdit = registrations.find(reg => reg.id === id);
    setEditData(dataToEdit);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    console.log(`Xóa số đăng ký ${id}`);
  };

  const handleSave = (data) => {
    if (editData) {
      console.log('Cập nhật số đăng ký', data);
      // Logic to update the existing record
    } else {
      console.log('Thêm mới số đăng ký', data);
      // Logic to add new record
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Số đăng ký | NCode"
          className="border py-2 rounded-md px-4"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Tìm kiếm
        </button>
        <button
          onClick={handleAddNew}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Thêm mới
        </button>
        <div className="flex-grow"></div>
        <ExportExcelButton data={registrations} parentComponentName="RegistrationTable" />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="py-2 px-4 text-left">STT</th>
              <th className="py-2 px-4 text-left">Số đăng ký</th>
              <th className="py-2 px-4 text-left">Số công bố</th>
              <th className="py-2 px-4 text-left">Ngày đăng ký</th>
              <th className="py-2 px-4 text-left">Ngày hết hạn</th>
              <th className="py-2 px-4 text-left">Sản phẩm</th>
              <th className="py-2 px-4 text-left">Phân loại</th>
              <th className="py-2 px-4 text-left">Trạng thái</th>
              <th className="py-2 px-4 text-left">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg, index) => (
              <tr key={reg.id} className="border-b border-gray-200">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{reg.registrationNumber}</td>
                <td className="py-2 px-4">{reg.approvalNumber}</td>
                <td className="py-2 px-4">{reg.registrationDate}</td>
                <td className="py-2 px-4">{reg.expirationDate}</td>
                <td className="py-2 px-4">{reg.product}</td>
                <td className="py-2 px-4">{reg.category}</td>
                <td className="py-2 px-4">{reg.status}</td>
                <td className="py-2 px-4 flex space-x-2">
                  <button
                    onClick={() => handleEdit(reg.id)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(reg.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Xóa
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
        contentLabel={editData ? 'Chỉnh sửa số đăng ký' : 'Thêm mới số đăng ký'}
        initialData={editData || {}}
      />
    </div>
  );
};

export default RegistrationTable;
