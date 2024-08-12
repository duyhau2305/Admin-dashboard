// src/components/PhuLieuCatalog.jsx
import React from 'react';

const phulieu = [
  {
    id: 1,
    status: 'Mới tạo',
    nCode: '[A01727]',
    material: 'Balance Intimate Gel 200ml',
    type: 'Xuất khẩu',
    unit: 'TEM',
    manufacturer: 'XX Dealer',
    country: 'CHINA',
  },
  {
    id: 2,
    status: 'Mới tạo',
    nCode: '[A01726]',
    material: 'Hộp Hermicton 1',
    type: 'Xuất khẩu',
    unit: 'CÁI',
    manufacturer: 'XX Myanmar',
    country: 'MYANMAR',
  },
  {
    id: 3,
    status: 'Mới tạo',
    nCode: '[A01726]',
    material: 'Kem Hermicton Test 10g',
    type: 'Xuất khẩu',
    unit: 'HỘP',
    manufacturer: 'XX Myanmar',
    country: 'MYANMAR',
  },
  // Thêm nhiều mục phụ liệu như cần thiết
];

const PhuLieuCatalog = () => {
  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Phụ liệu | NCode"
          className="border p-2 rounded-md flex-grow"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Tìm kiếm</button>
        <button className="bg-green-500 text-white px-4 py-2 rounded-md">Thêm mới</button>
        <div className="flex items-center">
          <input type="checkbox" id="externalSample" className="mr-2" />
          <label htmlFor="externalSample">Gửi mẫu ngoài</label>
        </div>
        <div className="flex-grow"></div> {/* Đẩy nút xuất excel sang bên phải */}
        <button className="bg-yellow-500 text-white px-4 py-2 rounded-md">Xuất Excel</button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">STT</th>
            <th className="border px-4 py-2">Trạng thái</th>
            <th className="border px-4 py-2">NCode</th>
            <th className="border px-4 py-2">Gửi mẫu ngoài</th>
            <th className="border px-4 py-2">Phụ liệu</th>
            <th className="border px-4 py-2">Loại</th>
            <th className="border px-4 py-2">ĐVT</th>
            <th className="border px-4 py-2">Nhà SX</th>
            <th className="border px-4 py-2">Quốc gia</th>
            <th className="border px-4 py-2">COA</th>
          </tr>
        </thead>
        <tbody>
          {phulieu.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{item.id}</td>
              <td className="border px-4 py-2">{item.status}</td>
              <td className="border px-4 py-2">{item.nCode}</td>
              <td className="border px-4 py-2 text-center">
                <input type="checkbox" />
              </td>
              <td className="border px-4 py-2">{item.material}</td>
              <td className="border px-4 py-2">{item.type}</td>
              <td className="border px-4 py-2">{item.unit}</td>
              <td className="border px-4 py-2">{item.manufacturer}</td>
              <td className="border px-4 py-2">{item.country}</td>
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

export default PhuLieuCatalog;
