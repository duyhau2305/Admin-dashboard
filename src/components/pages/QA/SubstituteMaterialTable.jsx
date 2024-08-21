import React, { useState } from 'react';
import DynamicFormModal from '../../../libs/consts/DynamicFormModal';
import ExportExcelButton from '../../../libs/consts/ExportExcelButton';
import { toast, ToastContainer } from 'react-toastify';
import { FaEdit, FaTrash } from 'react-icons/fa';

const substituteMaterialsData = [
  {
    id: '001',
    status: 'Đang sử dụng',
    currentMaterial: 'Nguyên liệu A',
    substituteMaterial: 'Nguyên liệu X',
    materialCode: 'X001',
    dueDate: '2024-08-10',
    result: 'Đã thay thế thành công',
    notes: 'Đã xác nhận chất lượng phù hợp',
  },
  {
    id: '002',
    status: 'Hết hàng',
    currentMaterial: 'Nguyên liệu B',
    substituteMaterial: 'Nguyên liệu Y',
    materialCode: 'Y002',
    dueDate: '2024-08-12',
    result: 'Chưa thay thế',
    notes: 'Chờ xác nhận từ nhà cung cấp',
  },
];

const SubstituteMaterialTable = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMaterials, setFilteredMaterials] = useState(substituteMaterialsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState(null);

  const handleSearch = () => {
    const filtered = substituteMaterialsData.filter(
      (item) =>
        item.currentMaterial.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.materialCode.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMaterials(filtered);
  };

  const handleAddNewMaterial = (newMaterial) => {
    if (editingMaterial) {
      setFilteredMaterials(
        filteredMaterials.map((item) =>
          item.id === editingMaterial.id ? { ...newMaterial, id: editingMaterial.id } : item
        )
      );
      setEditingMaterial(null);
      toast.success('Cập nhật nguyên liệu thành công!');
    } else {
      setFilteredMaterials([...filteredMaterials, { ...newMaterial, id: Date.now().toString() }]);
      toast.success('Thêm nguyên liệu thành công!');
    }
  };

  const handleEditMaterial = (material) => {
    setEditingMaterial(material);
    setIsModalOpen(true);
  };

  const handleDeleteMaterial = (materialId) => {
    setFilteredMaterials(filteredMaterials.filter((item) => item.id !== materialId));
    toast.success('Xóa nguyên liệu thành công!');
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
              <th className="py-2 px-4 text-center text-xs whitespace-nowrap" >Kết quả</th>
              <th className="py-2 px-4 text-center text-xs ">Ghi chú</th>
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
