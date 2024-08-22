import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DynamicFormModal from '../../../libs/consts/DynamicFormModal';
import ExportExcelButton from '../../../libs/consts/ExportExcelButton';
import { toast, ToastContainer } from 'react-toastify';
import { FaEdit, FaTrash } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

const SubstituteMaterialTable = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [materials, setMaterials] = useState([]);
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState(null);

  const fetchMaterials = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/substitute-materials');
      console.log('Fetched materials:', response.data);
      setMaterials(response.data);
      setFilteredMaterials(response.data);
    } catch (error) {
      console.error('Error fetching materials:', error);
      toast.error('Lỗi khi tải dữ liệu nguyên liệu!');
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const handleSearch = () => {
    const filtered = materials.filter(
      (item) =>
        item.currentMaterial.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.materialCode.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMaterials(filtered);
  };

  const handleAddNewMaterial = async (newMaterial) => {
    try {
      if (editingMaterial) {
        console.log('Updating material:', editingMaterial.id);
        const response = await axios.put(`http://localhost:5000/api/substitute-materials/${editingMaterial.id}`, newMaterial);
        console.log('Updated material:', response.data);
        setMaterials((prevMaterials) => 
          prevMaterials.map((item) => 
            item.id === editingMaterial.id ? response.data : item
          )
        );
        toast.success('Cập nhật nguyên liệu thành công!');
      } else {
        console.log('Adding new material:', newMaterial);
        const response = await axios.post('http://localhost:5000/api/substitute-materials', newMaterial);
        console.log('Added material:', response.data);
        setMaterials((prevMaterials) => [...prevMaterials, response.data]);
        toast.success('Thêm nguyên liệu thành công!');
      }
      setFilteredMaterials((prevMaterials) => [...prevMaterials, newMaterial]);
      setEditingMaterial(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving material:', error);
      toast.error('Lỗi khi lưu nguyên liệu!');
    }
  };

  const handleEditMaterial = (material) => {
    console.log('Editing material:', material);
    setEditingMaterial(material);
    setIsModalOpen(true);
  };

  const handleDeleteMaterial = async (materialId) => {
    try {
      console.log('Deleting material with ID:', materialId);
      await axios.delete(`http://localhost:5000/api/substitute-materials/${materialId}`);
      setMaterials((prevMaterials) => prevMaterials.filter((item) => item.id !== materialId));
      setFilteredMaterials((prevMaterials) => prevMaterials.filter((item) => item.id !== materialId));
      toast.success('Xóa nguyên liệu thành công!');
    } catch (error) {
      console.error('Error deleting material:', error);
      toast.error('Lỗi khi xóa nguyên liệu!');
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Tên nguyên liệu | Mã hàng hóa"
          className="border px-4 py-2 rounded-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Tìm kiếm
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Thêm mới
        </button>
        <div className="flex-grow"></div>
        <ExportExcelButton data={filteredMaterials} parentComponentName="SubstituteMaterials" />
      </div>

      {/* Bảng cuộn ngang */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="py-2 px-4 text-center text-xs">STT</th>
              <th className="py-2 px-4 text-center whitespace-nowrap text-xs">Trạng thái</th>
              <th className="py-2 px-4 text-center text-xs whitespace-nowrap">NL đang sử dụng</th>
              <th className="py-2 px-4 text-center text-xs whitespace-nowrap">NL thay thế</th>
              <th className="py-2 px-4 text-center text-xs whitespace-nowrap">Mã hàng hóa</th>
              <th className="py-2 px-4 text-center text-xs whitespace-nowrap">Hạn trả kết quả</th>
              <th className="py-2 px-4 text-center text-xs whitespace-nowrap">Kết quả</th>
              <th className="py-2 px-4 text-center text-xs">Ghi chú</th>
              <th className="py-2 px-4 text-center whitespace-nowrap text-xs">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredMaterials.map((item, index) => (
              <tr key={item.id} className="border-b border-gray-200">
                <td className="py-2 px-4 text-xs">{index + 1}</td>
                <td className="py-2 px-4 text-xs whitespace-nowrap">{item.status}</td>
                <td className="py-2 px-4 text-xs">{item.currentMaterial}</td>
                <td className="py-2 px-4 text-xs whitespace-nowrap">{item.substituteMaterial}</td>
                <td className="py-2 px-4 text-xs">{item.materialCode}</td>
                <td className="py-2 px-4 text-xs">{item.dueDate}</td>
                <td className="py-2 px-4 text-xs whitespace-nowrap">{item.result}</td>
                <td className="py-2 px-4 text-xs whitespace-pre-wrap">{item.notes}</td>
                <td className="py-2 px-2 text-center">
                  <button
                    onClick={() => handleEditMaterial(item)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteMaterial(item.id)}
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
        onClose={() => {
          setIsModalOpen(false);
          setEditingMaterial(null);
        }}
        onSave={handleAddNewMaterial}
        formFields={[
          { name: 'status', label: 'Trạng thái', placeholder: 'Nhập trạng thái', type: 'text' },
          { name: 'currentMaterial', label: 'Nguyên liệu đang sử dụng', placeholder: 'Nhập nguyên liệu đang sử dụng', type: 'text' },
          { name: 'substituteMaterial', label: 'Nguyên liệu thay thế', placeholder: 'Nhập nguyên liệu thay thế', type: 'text' },
          { name: 'materialCode', label: 'Mã hàng hóa', placeholder: 'Nhập mã hàng hóa', type: 'text' },
          { name: 'dueDate', label: 'Hạn trả kết quả', placeholder: 'Nhập hạn trả kết quả', type: 'date' },
          { name: 'result', label: 'Kết quả', placeholder: 'Nhập kết quả', type: 'text' },
          { name: 'notes', label: 'Ghi chú', placeholder: 'Nhập ghi chú', type: 'textarea' },
        ]}
        contentLabel={editingMaterial ? 'Chỉnh sửa nguyên liệu' : 'Thêm nguyên liệu mới'}
        initialData={editingMaterial || {}}
      />
      <ToastContainer />
    </div>
  );
};

export default SubstituteMaterialTable;
