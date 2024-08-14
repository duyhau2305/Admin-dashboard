import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

function ChemicalEntry() {
  const chemicals = [
    {
      id: 1,
      date: '10/08/2024',
      enteredBy: 'Trần Thu Hà',
      status: 'Mới tạo',
      chemicalName: '[126456] IHeart 5',
      batch: 'HX30686110',
      quantity: '3500 (ML)',
      unitPrice: '1 (Chai)',
      totalPrice: '1,440,000 đ',
      VAT: 10,
      warehouse: '01010',
      manufacturer: 'Công ty TNHH Thương Mại KHC',
      country: 'Đức',
    },
    {
      id: 2,
      date: '07/08/2024',
      enteredBy: 'Trần Thu Hà',
      status: 'Mới tạo',
      chemicalName: '[B01733] Bản mỏng Silicagel G254',
      batch: 'HX30688234',
      quantity: '3 (Hộp)',
      unitPrice: '3,288,000 đ',
      VAT: 10,
      warehouse: '01010',
      manufacturer: 'Merck',
      country: 'Đức',
    },
    // Add more chemical entries here...
  ];

  return (
    <div className="container mx-auto mt-5">
      <div className="sticky top-0 bg-white z-10 p-2">
        <div className="flex items-center gap-2 mb-2">
          <input
            type="text"
            placeholder="Hóa chất | Product Name"
            className="border p-1 rounded-md text-sm px-2"
          />
          <button className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm">Tìm kiếm</button>
          <button className="bg-green-500 text-white px-3 py-1 rounded-md text-sm">Nhập mới</button>
          <div className="flex-grow"></div>
          <button className="bg-yellow-500 text-white px-3 py-1 rounded-md text-xs">Xuất Excel</button>
        </div>
      </div>

      <table className="min-w-full bg-white border">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="border px-1 py-1 text-xs">STT</th>
            <th className="border whitespace-nowrap px-1 py-1 text-xs">Ngày nhập</th>
            <th className="border whitespace-nowrap px-1 py-1 text-xs">Người nhập</th>
            <th className="border whitespace-nowrap px-1 py-1 text-xs">Trạng thái</th>
            <th className="border whitespace-nowrap px-1 py-1 text-xs">Tên hóa chất</th>
            <th className="border whitespace-nowrap px-1 py-1 text-xs">Số lô</th>
            <th className="border whitespace-nowrap px-1 py-1 text-xs">Khối lượng</th>
            <th className="border whitespace-nowrap px-1 py-1 text-xs">Quy cách</th>
            <th className="border whitespace-nowrap px-1 py-1 text-xs">Giá tiền</th>
            <th className="border whitespace-nowrap px-1 py-1 text-xs">VAT</th>
            <th className="border whitespace-nowrap px-1 py-1 text-xs">Kho</th>
            <th className="border whitespace-nowrap px-1 py-1 text-xs">Nhà SX</th>
            <th className="border whitespace-nowrap px-1 py-1 text-xs">Quốc gia</th>
            <th className="border whitespace-nowrap px-1 py-1 text-xs">Actions</th>
          </tr>
        </thead>
        <tbody>
          {chemicals.map((chemical, index) => (
            <tr key={chemical.id} className="border-b">
              <td className="p-2 text-xs">{index + 1}</td>
              <td className="p-2 text-xs">{chemical.date}</td>
              <td className="p-2 text-xs">{chemical.enteredBy}</td>
              <td className="p-2 text-xs">{chemical.status}</td>
              <td className="p-2 text-xs">{chemical.chemicalName}</td>
              <td className="p-2 text-xs">{chemical.batch}</td>
              <td className="p-2 text-xs">{chemical.quantity}</td>
              <td className="p-2 text-xs">{chemical.unitPrice}</td>
              <td className="p-2 text-xs">{chemical.totalPrice}</td>
              <td className="p-2 text-xs">{chemical.VAT}%</td>
              <td className="p-2 text-xs">{chemical.warehouse}</td>
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

export default ChemicalEntry;
