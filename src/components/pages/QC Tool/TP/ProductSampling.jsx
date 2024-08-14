import React, { useState } from 'react';

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
    // Add more data as needed...
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  // Handle the search button functionality
  const handleSearch = () => {
    if (searchTerm) {
      const filteredData = samplingData.filter(item =>
        item.material.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSamplingData(filteredData);
    } else {
      alert('Vui lòng nhập từ khóa để tìm kiếm');
    }
  };

  // Handle adding a new item
  const handleAddNew = () => {
    const newItem = {
      id: samplingData.length + 1,
      dateIn: 'DD/MM/YYYY',
      enteredBy: 'Người nhập mới',
      status: 'Mới tạo',
      material: 'Phụ liệu mới',
      batch: `PL00${samplingData.length + 1}`,
      serialNumber: `K00${samplingData.length + 1}`,
      weight: 0,
      specification: '',
      productionDate: '',
      expiryDate: '',
      manufacturer: '',
      supplier: '',
    };
    setSamplingData([...samplingData, newItem]);
  };

  // Handle exporting data to Excel
  const handleExportExcel = () => {
    // Logic for exporting data to Excel can be implemented here
    console.log('Xuất dữ liệu thành file Excel...');
    alert('Xuất dữ liệu thành công!');
  };

  return (
    <div className="container mx-auto mt-3">
      <div className="sticky top-0 bg-white z-10 p-2">
        <div className="flex items-center gap-2 mb-2 mt-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
          <button
            className="bg-yellow-500 text-white px-3 py-1 rounded-md text-xs"
            onClick={handleExportExcel}
          >
            Xuất Excel
          </button>
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
    </div>
  );
}

export default ProductSampling;
