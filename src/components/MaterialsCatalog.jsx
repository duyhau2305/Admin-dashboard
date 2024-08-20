import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { toast , ToastContainer} from 'react-toastify';
import * as yup from 'yup';
import {AiOutlineSearch} from 'react-icons/ai'
import { FaEdit, FaTrash } from 'react-icons/fa';
import DynamicFormModal from '../libs/consts/DynamicFormModal';
import ExportExcelButton from '../libs/consts/ExportExcelButton';

Modal.setAppElement('#root');

const MaterialsCatalog = () => {
  const [materials, setMaterials] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const itemsPerPage = 10;

  // Fetch materials from the API when component is mounted
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/materials');
        setMaterials(response.data);
      } catch (error) {
        console.error('Error fetching materials:', error);
        toast.error('Lỗi khi tải dữ liệu nguyên liệu');
      }
    };

    fetchMaterials();
  }, []);

  // Save new material to the API
  const handleSave = async (data) => {
    try {
      if (selectedMaterial) {
        // Update existing material
        const response = await axios.put(`http://localhost:5000/api/materials/${selectedMaterial._id}`, data);
        setMaterials((prevMaterials) =>
          prevMaterials.map((material) =>
            material._id === selectedMaterial._id ? response.data : material
          )
        );
        toast.success('Cập nhật thành công!');
      } else {
        // Add new material
        const response = await axios.post('http://localhost:5000/api/materials', data);
        setMaterials((prevMaterials) => [
          ...prevMaterials,
          { id: response.data._id, ...response.data },
        ]);
        toast.success('Đã lưu thành công!');
      }
      setIsModalOpen(false);
      setSelectedMaterial(null);
    } catch (error) {
      console.error('Error saving material:', error);
      toast.error('Lỗi khi lưu nguyên liệu');
    }
  };

  // Delete material
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/materials/${id}`);
      setMaterials((prevMaterials) => prevMaterials.filter((material) => material._id !== id));
      toast.success('Xóa thành công!');
    } catch (error) {
      console.error('Error deleting material:', error);
      toast.error('Lỗi khi xóa nguyên liệu');
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter materials based on search query
  const filteredMaterials = materials.filter(
    (material) =>
      (material.nCode && material.nCode.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (material.material && material.material.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMaterials.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredMaterials.length / itemsPerPage);

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Nguyên liệu | NCode"
          value={searchQuery}
          onChange={handleSearchChange}
          className="border p-2 rounded-md"
        />
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition flex items-center"> 
          <AiOutlineSearch className="mr-2" /> Tìm kiếm</button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md"
          onClick={() => setIsModalOpen(true)}
        >
          Thêm mới
        </button>
        <div className="flex items-center">
          <input type="checkbox" id="externalSample" className="mr-2" />
          <label htmlFor="externalSample">Gửi mẫu ngoài</label>
        </div>
        <div className="flex-grow"></div>
        <ExportExcelButton data={materials} parentComponentName="MaterialsCatalog" />
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border whitespace-nowrap px-2 py-1 text-xs">STT</th>
            <th className="border whitespace-nowrap px-2 py-1 text-xs">Trạng thái</th>
            <th className="border whitespace-nowrap px-2 py-1 text-xs">NCode</th>
            <th className="border whitespace-nowrap px-2 py-1 text-xs">Gửi mẫu ngoài</th>
            <th className="border whitespace-nowrap px-2 py-1 text-xs">Nguyên liệu</th>
            <th className="border whitespace-nowrap px-2 py-1 text-xs">INN</th>
            <th className="border whitespace-nowrap px-2 py-1 text-xs">Loại</th>
            <th className="border whitespace-nowrap px-2 py-1 text-xs">ĐMKN</th>
            <th className="border whitespace-nowrap px-2 py-1 text-xs">ĐVT</th>
            <th className="border whitespace-nowrap px-2 py-1 text-xs">Nhà SX</th>
            <th className="border whitespace-nowrap px-2 py-1 text-xs">Quốc gia</th>
            <th className="border whitespace-nowrap px-2 py-1 text-xs">COA</th>
            <th className="border whitespace-nowrap px-2 py-1 text-xs">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((material, index) => (
            <tr key={material.id} className="hover:bg-gray-50">
              <td className="border px-4 py-2 text-sm">{indexOfFirstItem + index + 1}</td>
              <td className="border px-4 py-2 whitespace-nowrap text-sm">{material.status}</td>
              <td className="border px-4 py-2 text-sm">{material.nCode}</td>
              <td className="border px-4 py-2 text-center text-sm">
                <input type="checkbox" defaultChecked={material.externalSample} />
              </td>
              <td className="border px-4 py-2 text-sm">{material.material}</td>
              <td className="border px-4 py-2 text-sm"></td>
              <td className="border px-4 py-2 text-sm">{material.type}</td>
              <td className="border px-4 py-2 text-sm">0</td>
              <td className="border px-4 py-2 text-sm">{material.unit}</td>
              <td className="border px-4 py-2 text-sm">{material.manufacturer}</td>
              <td className="border px-4 py-2 text-sm">{material.country}</td>
              <td className="border px-4 py-2 text-sm"></td>
              <td className="py-2 px-2 text-center border">
                <button
                  className="text-blue-500 hover:text-blue-700 mr-2"
                  onClick={() => {
                    setSelectedMaterial(material);
                    setIsModalOpen(true);
                  }}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(material._id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex items-center justify-center mt-4">
        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-2 py-1 text-sm border rounded-sm ${currentPage === index + 1 ? 'bg-orange-400 text-white' : 'bg-white text-gray-700'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Modal for adding or editing materials */}
      <DynamicFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedMaterial(null);
        }}
        onSave={handleSave}
        formFields={[
          { name: 'status', label: 'Trạng thái', type: 'text', validation: yup.string().required() },
          { name: 'nCode', label: 'NCode', type: 'text', validation: yup.string().required() },
          { name: 'material', label: 'Nguyên liệu', type: 'text', validation: yup.string().required() },
          { name: 'type', label: 'Loại', type: 'text', validation: yup.string().required() },
          { name: 'unit', label: 'ĐVT', type: 'text', validation: yup.string().required() },
          { name: 'manufacturer', label: 'Nhà SX', type: 'text', validation: yup.string().required() },
          { name: 'country', label: 'Quốc gia', type: 'text', validation: yup.string().required() },
        ]}
        contentLabel={selectedMaterial ? 'Chỉnh sửa Nguyên liệu' : 'Thêm mới Nguyên liệu'}
        initialData={selectedMaterial}
      />
      <ToastContainer/>
    </div>
  );
};

export default MaterialsCatalog;
