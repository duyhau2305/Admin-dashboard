// src/components/MaterialsCatalog.jsx
import React from 'react';

const materials = [
  {
    id: 1,
    status: 'Mới tạo',
    nCode: '[A01727]',
    material: 'Ammoni Oxalate Monohydrate',
    type: 'Khác',
    unit: 'GAM',
    manufacturer: 'Shanghai zhanyun chemical co.ltd',
    country: 'CHINA',
  },
  {
    id: 2,
    status: 'Mới tạo',
    nCode: '[A01726]',
    material: 'Ammoni Oxalate Monohydrate',
    type: 'Khác',
    unit: 'GAM',
    manufacturer: 'Shanghai zhanyun chemical co.ltd',
    country: 'CHINA',
  },
  {
    id: 3,
    status: 'Mới tạo',
    nCode: '[A01726]',
    material: 'Ammoni Oxalate Monohydrate',
    type: 'Khác',
    unit: 'GAM',
    manufacturer: 'Shanghai zhanyun chemical co.ltd',
    country: 'USA',
  },
  {
    id: 4,
    status: 'Mới tạo',
    nCode: '[A01726]',
    material: 'Ammoni Oxalate Monohydrate',
    type: 'Khác',
    unit: 'GAM',
    manufacturer: 'Shanghai zhanyun chemical co.ltd',
    country: 'TURKEY',
  },
  // Add more materials as needed
];

const MaterialsCatalog = () => {
  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Nguyên liệu | NCode"
          className="border p-2 rounded-md "
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Tìm kiếm</button>
        <button className="bg-green-500 text-white px-4 py-2 rounded-md">Thêm mới</button>
        <div className="flex items-center">
          <input type="checkbox" id="externalSample" className="mr-2" />
          <label htmlFor="externalSample">Gửi mẫu ngoài</label>
        </div>
        <div className="flex-grow"></div> {/* This pushes the button to the right */}
        <button className="bg-yellow-500 text-white px-4 py-2 rounded-md">Xuất Excel</button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">STT</th>
            <th className="border px-4 py-2">Trạng thái</th>
            <th className="border px-4 py-2">NCode</th>
            <th className="border px-4 py-2">Gửi mẫu ngoài</th>
            <th className="border px-4 py-2">Nguyên liệu</th>
            <th className="border px-4 py-2">INN</th>
            <th className="border px-4 py-2">Loại</th>
            <th className="border px-4 py-2">ĐMKN</th>
            <th className="border px-4 py-2">ĐVT</th>
            <th className="border px-4 py-2">Nhà SX</th>
            <th className="border px-4 py-2">Quốc gia</th>
            <th className="border px-4 py-2">COA</th>
          </tr>
        </thead>
        <tbody>
          {materials.map((material) => (
            <tr key={material.id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{material.id}</td>
              <td className="border px-4 py-2">{material.status}</td>
              <td className="border px-4 py-2">{material.nCode}</td>
              <td className="border px-4 py-2 text-center">
                <input type="checkbox" />
              </td>
              <td className="border px-4 py-2">{material.material}</td>
              <td className="border px-4 py-2"></td>
              <td className="border px-4 py-2">{material.type}</td>
              <td className="border px-4 py-2">0</td>
              <td className="border px-4 py-2">{material.unit}</td>
              <td className="border px-4 py-2">{material.manufacturer}</td>
              <td className="border px-4 py-2">{material.country}</td>
              <td className="border px-4 py-2"></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <button className="px-4 py-2 border">1</button>
        <button className="px-4 py-2 border">2</button>
        <button className="px-4 py-2 border">3</button>
        <button className="px-4 py-2 border">...</button>
        <button className="px-4 py-2 border">387</button>
        <button className="px-4 py-2 border">&raquo;</button>
      </div>
      
    </div>
    
  );
};

export default MaterialsCatalog;
