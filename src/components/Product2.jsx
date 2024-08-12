import React from 'react';

const dailyMaterials = [
  {
    date: '2024-08-07',
    items: [
      {
        id: '001',
        name: 'Nguyên liệu A',
        unit: 'kg',
        manufacturer: 'Nhà sản xuất X',
        quantityRequirement: 50,
        quantity: 25,
      },
      {
        id: '002',
        name: 'Nguyên liệu B',
        unit: 'lít',
        manufacturer: 'Nhà sản xuất Y',
        quantityRequirement: 100,
        quantity: 75,
      }
    ]
  },
  {
    date: '2024-08-08',
    items: [
      {
        id: '003',
        name: 'Nguyên liệu C',
        unit: 'kg',
        manufacturer: 'Nhà sản xuất Z',
        quantityRequirement: 30,
        quantity: 10,
      }
    ]
  }
  // Thêm các ngày khác ở đây
];

const MaterialList = () => {
  const handleConfirm = (id) => {
    console.log(`Xác nhận yêu cầu cho nguyên liệu có mã ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Xóa nguyên liệu có mã ${id}`);
  };

  return (
    <div className="p-4">
      <div className="text-lg font-semibold mb-4">
        Danh sách nguyên liệu theo ngày
      </div>
      {dailyMaterials.map((day) => (
        <div key={day.date} className="mb-6">
          <div className="text-xl font-medium mb-2">{`Ngày: ${day.date}`}</div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="py-2 px-4 text-left">Mã hàng hóa</th>
                  <th className="py-2 px-4 text-left">Tên sản phẩm</th>
                  <th className="py-2 px-4 text-left">Đơn vị</th>
                  <th className="py-2 px-4 text-left">Nhà sản xuất</th>
                  <th className="py-2 px-4 text-left">Định mức khối lượng</th>
                  <th className="py-2 px-4 text-left">Khối lượng</th>
                  <th className="py-2 px-4 text-left">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {day.items.map((material) => (
                  <tr key={material.id} className="border-b border-gray-200">
                    <td className="py-2 px-4">{material.id}</td>
                    <td className="py-2 px-4">{material.name}</td>
                    <td className="py-2 px-4">{material.unit}</td>
                    <td className="py-2 px-4">{material.manufacturer}</td>
                    <td className="py-2 px-4">{material.quantityRequirement}</td>
                    <td className="py-2 px-4">{material.quantity}</td>
                    <td className="py-2 px-4 flex space-x-2">
                      <button
                        onClick={() => handleConfirm(material.id)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Yêu cầu xuất
                      </button>
                      
                      <button
                        onClick={() => handleDelete(material.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MaterialList;
