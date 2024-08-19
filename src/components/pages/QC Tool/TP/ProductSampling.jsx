import React, { useState } from 'react';
import DynamicFormModal from '../../../../libs/consts/DynamicFormModal';
import ExportExcelButton from '../../../../libs/consts/ExportExcelButton';

function ProductSampling() {
  const [samplingData, setSamplingData] = useState([
    {
      id: 1,
      dateIn: '10/08/2024',
      enteredBy: 'Nguyễn Văn A',
      status: 'Mới tạo',
      material: 'Phụ liệu A',
      batch: 'PL001',
      serialNumber: 'K001',
      weight: 500,
      specification: 'Kg',
      productionDate: '01/07/2024',
      expiryDate: '01/07/2026',
      manufacturer: 'Công ty ABC',
      supplier: 'Nhà cung cấp X',
    },
    {
      id: 2,
      dateIn: '08/08/2024',
      enteredBy: 'Trần Thị B',
      status: 'Đã duyệt',
      material: 'Phụ liệu B',
      batch: 'PL002',
      serialNumber: 'K002',
      weight: 1000,
      specification: 'L',
      productionDate: '01/06/2024',
      expiryDate: '01/06/2026',
      manufacturer: 'Công ty XYZ',
      supplier: 'Nhà cung cấp Y',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = () => {
    // Placeholder for search logic
    alert('Search functionality to be implemented.');
  };

  const handleAddNew = () => {
    setIsModalOpen(true);
  };

  const handleSaveNewItem = (newItem) => {
    setSamplingData([...samplingData, { id: samplingData.length + 1, ...newItem }]);
    setIsModalOpen(false);
  };

  // Define form fields for DynamicFormModal
  const formFields = [
    { name: 'dateIn', label: 'Ngày nhập', type: 'date' },
    { name: 'enteredBy', label: 'Người nhập', type: 'text', placeholder: 'Nguyễn Văn A' },
    { name: 'status', label: 'Trạng thái', type: 'text' },
    { name: 'material', label: 'Phụ liệu', type: 'text' },
    { name: 'batch', label: 'Số lô', type: 'text' },
    { name: 'serialNumber', label: 'Số K', type: 'text' },
    { name: 'weight', label: 'Khối lượng', type: 'number' },
    { name: 'specification', label: 'Quy cách', type: 'text' },
    { name: 'productionDate', label: 'Ngày sản xuất', type: 'date' },
    { name: 'expiryDate', label: 'Hạn dùng', type: 'date' },
    { name: 'manufacturer', label: 'Nhà sản xuất', type: 'text' },
    { name: 'supplier', label: 'Nhà cung cấp', type: 'text' },
  ];

  return (
    <div className="container mx-auto mt-3">
      <div className="sticky top-0 bg-white z-10 p-2">
        <div className="flex items-center gap-2 mb-2 mt-2">
          <input
            type="text"
            placeholder="Phụ liệu | Material Name"
            className="border p-1 rounded-md text-sm px-2"
          />
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm"
            onClick={handleSearch}
          >
            Tìm kiếm
          </button>
          <button
            className="bg-green-500 text-white px-3 py-1 rounded-md text-sm"
            onClick={handleAddNew}
          >
            Thêm mới
          </button>
          <div className="flex-grow"></div>
          <ExportExcelButton data={samplingData} />
        </div>
      </div>

      <table className="min-w-full bg-white border">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="p-2 text-xs whitespace-nowrap">STT</th>
            <th className="p-2 text-xs whitespace-nowrap">Ngày nhập</th>
            <th className="p-2 text-xs whitespace-nowrap">Người nhập</th>
            <th className="p-2 text-xs whitespace-nowrap">Trạng thái</th>
            <th className="p-2 text-xs whitespace-nowrap">Phụ liệu</th>
            <th className="p-2 text-xs whitespace-nowrap">Số lô</th>
            <th className="p-2 text-xs whitespace-nowrap">Số K</th>
            <th className="p-2 text-xs whitespace-nowrap">Khối lượng</th>
            <th className="p-2 text-xs whitespace-nowrap">Quy cách</th>
            <th className="p-2 text-xs whitespace-nowrap">Ngày sản xuất</th>
            <th className="p-2 text-xs whitespace-nowrap">Hạn dùng</th>
            <th className="p-2 text-xs whitespace-nowrap">Nhà sản xuất</th>
            <th className="p-2 text-xs whitespace-nowrap">Nhà cung cấp</th>
          </tr>
        </thead>
        <tbody>
          {samplingData.map((item, index) => (
            <tr key={item.id} className="border-b">
              <td className="p-2 text-xs">{index + 1}</td>
              <td className="p-2 text-xs">{item.dateIn}</td>
              <td className="p-2 text-xs">{item.enteredBy}</td>
              <td className="p-2 text-xs">{item.status}</td>
              <td className="p-2 text-xs">{item.material}</td>
              <td className="p-2 text-xs">{item.batch}</td>
              <td className="p-2 text-xs">{item.serialNumber}</td>
              <td className="p-2 text-xs">{item.weight}</td>
              <td className="p-2 text-xs">{item.specification}</td>
              <td className="p-2 text-xs">{item.productionDate}</td>
              <td className="p-2 text-xs">{item.expiryDate}</td>
              <td className="p-2 text-xs">{item.manufacturer}</td>
              <td className="p-2 text-xs">{item.supplier}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <DynamicFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveNewItem}
        formFields={formFields}
        contentLabel={"Lấy mẫu thanh phẩm"}
      />
    </div>
  );
}

export default ProductSampling;
