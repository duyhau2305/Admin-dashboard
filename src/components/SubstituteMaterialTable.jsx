import React from 'react';

const substituteMaterials = [
  {
    id: '001',
    status: 'Đang sử dụng',
    currentMaterial: 'Nguyên liệu A',
    substituteMaterial: 'Nguyên liệu X',
    materialCode: 'X001',
    dueDate: '2024-08-10',
    result: 'Đã thay thế thành công',
    notes: 'Đã xác nhận chất lượng phù hợp',
  },
  {
    id: '002',
    status: 'Hết hàng',
    currentMaterial: 'Nguyên liệu B',
    substituteMaterial: 'Nguyên liệu Y',
    materialCode: 'Y002',
    dueDate: '2024-08-12',
    result: 'Chưa thay thế',
    notes: 'Chờ xác nhận từ nhà cung cấp',
  },
  // Thêm các nguyên liệu khác ở đây
];

const SubstituteMaterialTable = () => {
  const handleSearch = () => {
    console.log('Tìm kiếm');
  };

  const handleAddNewReport = () => {
    console.log('Thêm mới báo cáo');
  };

  const handleExportExcel = () => {
    console.log('Xuất Excel');
  };

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Tên nguyên liệu | NCode"
          className="border px-4 py-2 rounded-md "
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Tìm kiếm
        </button>
        <button
          onClick={handleAddNewReport}
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
              <th className="py-2 px-4 text-left">Trạng thái</th>
              <th className="py-2 px-4 text-left">NL đang sử dụng</th>
              <th className="py-2 px-4 text-left">NL thay thế</th>
              <th className="py-2 px-4 text-left">Mã hàng hóa</th>
              <th className="py-2 px-4 text-left">Hạn trả kết quả</th>
              <th className="py-2 px-4 text-left">Kết quả</th>
              <th className="py-2 px-4 text-left">Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            {substituteMaterials.map((item, index) => (
              <tr key={item.id} className="border-b border-gray-200">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{item.status}</td>
                <td className="py-2 px-4">{item.currentMaterial}</td>
                <td className="py-2 px-4">{item.substituteMaterial}</td>
                <td className="py-2 px-4">{item.materialCode}</td>
                <td className="py-2 px-4">{item.dueDate}</td>
                <td className="py-2 px-4">{item.result}</td>
                <td className="py-2 px-4">{item.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubstituteMaterialTable;
