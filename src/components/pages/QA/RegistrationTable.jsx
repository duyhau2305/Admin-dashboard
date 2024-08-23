import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import ExportExcelButton from '../../../libs/consts/ExportExcelButton';
import DynamicFormModal from '../../../libs/consts/DynamicFormModal';

const RegistrationTable = () => {
  const [registrations, setRegistrations] = useState([]); // Lưu trữ danh sách đăng ký
  const [isModalOpen, setIsModalOpen] = useState(false); // Kiểm soát trạng thái modal
  const [editData, setEditData] = useState(null); // Lưu trữ dữ liệu để chỉnh sửa

  const formFields = [
    { name: 'registrationNumber', label: 'Số đăng ký', placeholder: 'Nhập số đăng ký' },
    { name: 'approvalNumber', label: 'Số công bố', placeholder: 'Nhập số công bố' },
    { name: 'registrationDate', label: 'Ngày đăng ký', type: 'date' },
    { name: 'expirationDate', label: 'Ngày hết hạn', type: 'date' },
    { name: 'product', label: 'Sản phẩm', placeholder: 'Nhập sản phẩm' },
    { name: 'category', label: 'Phân loại', placeholder: 'Nhập phân loại' },
    { name: 'status', label: 'Trạng thái', placeholder: 'Nhập trạng thái' },
  ];

  // Hàm lấy danh sách đăng ký từ API
  const fetchRegistrations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/registrations');
      setRegistrations(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách đăng ký:', error);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const handleAddNew = () => {
    setEditData(null); // Xóa dữ liệu cũ để thêm mới
    setIsModalOpen(true);
  };

  const handleEdit = (id) => {
    const dataToEdit = registrations.find(reg => reg.id === id);
    setEditData(dataToEdit); // Đặt dữ liệu để chỉnh sửa
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/registrations/${id}`);
      setRegistrations(prevRegistrations => prevRegistrations.filter(reg => reg.id !== id));
    } catch (error) {
      console.error('Lỗi khi xóa đăng ký:', error);
    }
  };

  const handleSave = async (data) => {
    try {
      if (editData) {
        const response = await axios.put(`http://localhost:5000/api/registrations/${editData.id}`, data);
        setRegistrations(prevRegistrations => 
          prevRegistrations.map(reg => reg.id === editData.id ? response.data : reg)
        );
      } else {
        const response = await axios.post('http://localhost:5000/api/registrations', data);
        setRegistrations(prevRegistrations => [...prevRegistrations, response.data]);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Lỗi khi lưu đăng ký:', error);
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
          onClick={() => console.log('Tìm kiếm')}
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
              <th className="py-2 px-4 text-left whitespace-nowrap">Số đăng ký</th>
              <th className="py-2 px-4 text-left">Số công bố</th>
              <th className="py-2 px-4 text-left">Ngày đăng ký</th>
              <th className="py-2 px-4 text-left">Ngày hết hạn</th>
              <th className="py-2 px-4 text-left whitespace-nowrap">Sản phẩm</th>
              <th className="py-2 px-4 text-left whitespace-nowrap">Phân loại</th>
              <th className="py-2 px-4 text-left whitespace-nowrap">Trạng thái</th>
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
                <td className="py-2 px-2 text-center">
                  <button
                    onClick={() => handleEdit(reg.id)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(reg.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
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
