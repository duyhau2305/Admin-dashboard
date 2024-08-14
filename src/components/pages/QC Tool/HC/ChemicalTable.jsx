import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

function ChemicalTable() {
  const chemicals = [
    {
      id: 1,
      status: 'Mới tạo',
      name: '[000622] Ống đong 250ml',
      typeChemical: 'ống đong',
      unit: 'CAI',
      manufacturer: 'Đức',
      country: 'Đức',
    },
    {
      id: 2,
      status: 'Mới tạo',
      name: '[B01611] Bộ bảo vệ cột - GL-Cart Cartridge Column InertSustain C8 5um',
      typeChemical: 'Pipep',
      unit: 'CAI',
      manufacturer: 'Nhật Bản',
      country: 'Nhật Bản',
    },
    {
      id: 3,
      status: 'Mới tạo',
      name: '[M01637] 5MDR-GT 5ML SYRINGE, SGE (Mỹ)',
      typeChemical: 'Ống đong',
      unit: 'CAI',
      manufacturer: 'Mỹ',
      country: 'Mỹ',
    },
    // Add more chemicals here
  ];

  return (
    <div className="container mx-auto mt-2">
      <div className="sticky top-0 bg-white z-10 p-2">
        <div className="flex items-center gap-2 mb-2">
          <input
            type="text"
            placeholder="Hóa chất | Product Name"
            className="border p-1 rounded-md text-sm px-2"
          />
          <button className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm">Tìm kiếm</button>
          <button className="bg-green-500 text-white px-3 py-1 rounded-md text-sm">Thêm mới</button>
          <div className="flex-grow"></div>
          <button className="bg-yellow-500 text-white px-3 py-1 rounded-md text-xs">Xuất Excel</button>
        </div>
      </div>
      <table className="min-w-full bg-white border">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="border whitespace-nowrap px-1 py-1 text-xs">STT</th>
            <th className="border whitespace-nowrap px-1 py-1 text-xs">Trạng thái</th>
            <th className="border whitespace-nowrap px-1 py-1 text-xs">Hóa chất</th>
            <th className="border whitespace-nowrap px-1 py-1 text-xs">Loại</th>
            <th className="border whitespace-nowrap px-1 py-1 text-xs">ĐVT</th>
            <th className="border whitespace-nowrap px-1 py-1 text-xs">Nhà SX</th>
            <th className="border whitespace-nowrap px-1 py-1 text-xs">Quốc gia</th>
            <th className="border whitespace-nowrap px-1 py-1 text-xs">Actions</th>
          </tr>
        </thead>
        <tbody>
          {chemicals.map((chemical, index) => (
            <tr key={chemical.id} className="border-b">
              <td className="p-2 text-xs">{index + 1}</td>
              <td className="p-2 text-xs">{chemical.status}</td>
              <td className="p-2 text-xs">{chemical.name}</td>
              <td className="p-2 text-xs">{chemical.typeChemical}</td>
              <td className="p-2 text-xs">{chemical.unit}</td>
              <td className="p-2 text-xs">{chemical.manufacturer}</td>
              <td className="p-2 text-xs">{chemical.country}</td>
              <td className="p-2 flex space-x-2">
                <button className="text-blue-500">
                  <FaEdit />
                </button>
                <button className="text-red-500">
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ChemicalTable;
