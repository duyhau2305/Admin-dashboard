import React from 'react';

const registrations = [
  {
    id: '001',
    registrationNumber: 'QLSP-903-15',
    approvalNumber: '1901/24/CPC1HN-TC',
    registrationDate: '2024-01-15',
    expirationDate: '2025-01-15',
    product: 'coladin',
    category: 'Thực phẩm chức năng',
    status: 'Đã duyệt',
  },
  {
    id: '002',
    registrationNumber: 'RQLSP-903-15',
    approvalNumber: '2002/24/CPC1HN-TC',
    registrationDate: '2024-02-20',
    expirationDate: '2025-02-20',
    product: 'Colodin',
    category: 'Sinh phẩm',
    status: 'Đã duyệt',
  },
  // Thêm các số đăng ký khác ở đây
];

const RegistrationTable = () => {
  const handleSearch = () => {
    console.log('Tìm kiếm');
  };

  const handleAddNew = () => {
    console.log('Thêm mới');
  };

  const handleExportExcel = () => {
    console.log('Xuất Excel');
  };

  const handleEdit = (id) => {
    console.log(`Sửa số đăng ký ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Xóa số đăng ký ${id}`);
  };

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Số đăng ký | NCode"
          className="border py-2 rounded-md px-4"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Tìm kiếm
        </button>
        <button
          onClick={handleAddNew}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Thêm mới
        </button>
        <div className="flex-grow"></div>
        <button
          onClick={handleExportExcel}
          className="bg-yellow-500 text-white px-4 py-2 rounded-md"
        >
          Xuất Excel
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="py-2 px-4 text-left">STT</th>
              <th className="py-2 px-4 text-left">Số đăng ký</th>
              <th className="py-2 px-4 text-left">Số công bố</th>
              <th className="py-2 px-4 text-left">Ngày đăng ký</th>
              <th className="py-2 px-4 text-left">Ngày hết hạn</th>
              <th className="py-2 px-4 text-left">Sản phẩm</th>
              <th className="py-2 px-4 text-left">Phân loại</th>
              <th className="py-2 px-4 text-left">Trạng thái</th>
              <th className="py-2 px-4 text-left">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg, index) => (
              <tr key={reg.id} className="border-b border-gray-200">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{reg.registrationNumber}</td>
                <td className="py-2 px-4">{reg.approvalNumber}</td>
                <td className="py-2 px-4">{reg.registrationDate}</td>
                <td className="py-2 px-4">{reg.expirationDate}</td>
                <td className="py-2 px-4">{reg.product}</td>
                <td className="py-2 px-4">{reg.category}</td>
                <td className="py-2 px-4">{reg.status}</td>
                <td className="py-2 px-4 flex space-x-2">
                  <button
                    onClick={() => handleEdit(reg.id)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(reg.id)}
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
  );
};

export default RegistrationTable;
