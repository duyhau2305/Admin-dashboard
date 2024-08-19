import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialMaterials = [
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
        isExported: false, // Thêm trạng thái này để theo dõi
      },
      {
        id: '002',
        name: 'Nguyên liệu B',
        unit: 'lít',
        manufacturer: 'Nhà sản xuất Y',
        quantityRequirement: 100,
        quantity: 75,
        isExported: false, // Thêm trạng thái này để theo dõi
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
        isExported: false, // Thêm trạng thái này để theo dõi
      }
    ]
  }
  // Thêm các ngày khác ở đây
];

const MaterialList = () => {
  const [materials, setMaterials] = useState(initialMaterials);

  const handleConfirm = (id) => {
    const updatedMaterials = materials.map((day) => ({
      ...day,
      items: day.items.map((material) =>
        material.id === id ? { ...material, isExported: true } : material
      ),
    }));

    setMaterials(updatedMaterials);
    toast.success('Đã gửi yêu cầu tới bộ phận kho');
  };

  const handleDelete = (id) => {
    const updatedMaterials = materials.map((day) => ({
      ...day,
      items: day.items.filter((material) => material.id !== id)
    })).filter(day => day.items.length > 0);

    setMaterials(updatedMaterials);
    toast.success('Xóa nguyên liệu thành công');
  };

  return (
    <div className="p-4">
      <div className="text-lg font-semibold mb-4">
        Danh sách nguyên liệu theo ngày
      </div>
      {materials.map((day) => (
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
                    <td className="py-2 px-4 text-xs">{material.id}</td>
                    <td className="py-2 px-4 text-xs">{material.name}</td>
                    <td className="py-2 px-4 text-xs">{material.unit}</td>
                    <td className="py-2 px-4 text-xs">{material.manufacturer}</td>
                    <td className="py-2 px-4 text-xs">{material.quantityRequirement}</td>
                    <td className="py-2 px-4 text-xs">{material.quantity}</td>
                    <td className="py-2 px-4 text-xs flex space-x-2">
                      {material.isExported ? (
                        <span className="px-3 py-1 bg-green-500 text-white rounded">Đã xuất</span>
                      ) : (
                        <button
                          onClick={() => handleConfirm(material.id)}
                          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Yêu cầu xuất
                        </button>
                      )}
                      
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
      {/* Toast Container để hiển thị thông báo */}
      <ToastContainer />
    </div>
  );
};

export default MaterialList;
