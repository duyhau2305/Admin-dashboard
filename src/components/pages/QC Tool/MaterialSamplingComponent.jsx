import React, { useState, useEffect } from 'react';
import DynamicFormModal from '../../../libs/consts/DynamicFormModal';
import ExportExcelButton from '../../../libs/consts/ExportExcelButton';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import FormatDate from '../../../libs/consts/FormatDate';

const MaterialSamplingComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  
  const formFields = [
    { name: 'entryDate', label: 'Ngày nhập', placeholder: 'Chọn ngày nhập', type: 'date' },
    { name: 'enteredBy', label: 'Người nhập', placeholder: 'Nhập tên người nhập', type: 'text' },
    { name: 'status', label: 'Trạng thái', placeholder: 'Nhập trạng thái', type: 'text' },
    { name: 'materialType', label: 'Loại nguyên liệu', placeholder: 'Nhập loại nguyên liệu', type: 'text' },
    { name: 'lotNumber', label: 'Số lô', placeholder: 'Nhập số lô', type: 'text' },
    { name: 'kNumber', label: 'Số K', placeholder: 'Nhập số K', type: 'text' },
    { name: 'weight', label: 'Khối lượng', placeholder: 'Nhập khối lượng', type: 'text' },
    { name: 'packaging', label: 'Quy cách', placeholder: 'Nhập quy cách', type: 'text' },
    { name: 'productionDate', label: 'Ngày sản xuất', placeholder: 'Chọn ngày sản xuất', type: 'date' },
    { name: 'expiryDate', label: 'Hạn sử dụng', placeholder: 'Chọn hạn sử dụng', type: 'date' },
    { name: 'manufacturer', label: 'Nhà sản xuất', placeholder: 'Nhập tên nhà sản xuất', type: 'text' },
    { name: 'supplier', label: 'Nhà cung cấp', placeholder: 'Nhập tên nhà cung cấp', type: 'text' },
  ];

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/laymauNguyenLieu');
      const data = await response.json();
      setFilteredMaterials(data);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu nguyên liệu:', error);
    }
  };

  const handleSearch = () => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = filteredMaterials.filter(material =>
      material.materialType.toLowerCase().includes(lowercasedSearchTerm) ||
      material.lotNumber.toLowerCase().includes(lowercasedSearchTerm)
    );
    setFilteredMaterials(filtered);
  };

  const handleCreate = () => {
    setInitialData(null);
    setIsModalOpen(true);
  };

  const handleSave = async (data) => {
    try {
      if (initialData) {
        await fetch(`http://localhost:5000/api/laymauNguyenLieu/${initialData._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        toast.success('Cập nhật nguyên liệu thành công!');
      } else {
        await fetch('http://localhost:5000/api/laymauNguyenLieu', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        toast.success('Tạo mới nguyên liệu thành công!');
      }

      setIsModalOpen(false);
      fetchMaterials();
    } catch (error) {
      console.error('Lỗi khi lưu nguyên liệu:', error);
      toast.error('Lưu nguyên liệu thất bại!');
    }
  };

  const handleEdit = (id) => {
    const material = filteredMaterials.find(material => material._id === id);
    setInitialData(material);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/laymauNguyenLieu/${id}`, { method: 'DELETE' });
      toast.success('Xóa nguyên liệu thành công!');
      fetchMaterials();
    } catch (error) {
      console.error('Lỗi khi xóa nguyên liệu:', error);
      toast.error('Xóa nguyên liệu thất bại!');
    }
  };

  return (
    <div className="p-4">
      <ToastContainer />
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Loại nguyên liệu | Số lô"
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
          Thêm nguyên liệu
        </button>
        <div className="flex-grow"></div>
        <ExportExcelButton
          data={filteredMaterials}
          parentComponentName="MaterialSampling"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="py-2 px-4 text-left">STT</th>
              <th className="py-2 px-4 text-left">Ngày nhập</th>
              <th className="py-2 px-4 text-left">Người nhập</th>
              <th className="py-2 px-4 text-left">Trạng thái</th>
              <th className="py-2 px-4 text-left">Loại nguyên liệu</th>
              <th className="py-2 px-4 text-left">Số lô</th>
              <th className="py-2 px-4 text-left">Số K</th>
              <th className="py-2 px-4 text-left">Khối lượng</th>
              <th className="py-2 px-4 text-left">Quy cách</th>
              <th className="py-2 px-4 text-left">Ngày sản xuất</th>
              <th className="py-2 px-4 text-left">Hạn sử dụng</th>
              <th className="py-2 px-4 text-left">Nhà sản xuất</th>
              <th className="py-2 px-4 text-left">Nhà cung cấp</th>
              <th className="py-2 px-4 text-left">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredMaterials.map((material, index) => (
              <tr key={material._id} className="border-b border-gray-200">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4"><FormatDate date={material.entryDate} /></td>
                <td className="py-2 px-4">{material.enteredBy}</td>
                <td className={`py-2 px-4 ${material.status === 'Pending Sample' ? 'text-orange-600' : 'text-green-600'}`}>
                  {material.status}
                </td>
                <td className="py-2 px-4">{material.materialType}</td>
                <td className="py-2 px-4">{material.lotNumber}</td>
                <td className="py-2 px-4">{material.kNumber}</td>
                <td className="py-2 px-4">{material.weight}</td>
                <td className="py-2 px-4">{material.packaging}</td>
                <td className="py-2 px-4"><FormatDate date={material.productionDate}/></td>
                <td className="py-2 px-4"><FormatDate date={material.expiryDate}/></td>
                <td className="py-2 px-4">{material.manufacturer}</td>
                <td className="py-2 px-4">{material.supplier}</td>
                <td className="py-2 px-2 text-center border">
                  <button
                    onClick={() => handleEdit(material._id)}
                    className=" text-blue-500 text-base rounded hover:text-blue-600 mr-2"
                  >
                    <AiFillEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(material._id)}
                    className=" text-red-500 text-base rounded hover:text-red-600"
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
        contentLabel="Nguyên liệu"
        initialData={initialData}
      />
    </div>
  );
};

export default MaterialSamplingComponent;
