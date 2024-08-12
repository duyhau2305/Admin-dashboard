import React from 'react';

const inspectionSheets = [
  {
    id: '001',
    product: '[L00847] Laci-eye - Hộp 20 ống 0.4ml',
    productCode: 'P12345',
    batchNumber: 'B001',
    file: 'file_a.pdf',
    printed: '2',
    createdBy: 'Vũ Thị Hoa',
    createdAt: '2024-08-01 10:30:00',
  },
  {
    id: '002',
    product: '[L00793] Laci-eye 3ml',
    productCode: 'P67890',
    batchNumber: 'B002',
    file: 'file_b.pdf',
    printed: 'Không',
    createdBy: 'Đồng Duy Hậu',
    createdAt: '2024-08-02 11:00:00',
  },
  {
    id: '002',
    product: '[L00793] Laci-eye 3ml',
    productCode: 'P67890',
    batchNumber: 'B002',
    file: 'file_b.pdf',
    printed: 'Không',
    createdBy: 'Đồng Duy Hậu',
    createdAt: '2024-08-02 11:00:00',
  },
  {
    id: '001',
    product: '[L00847] Laci-eye - Hộp 20 ống 0.4ml',
    productCode: 'P12345',
    batchNumber: 'B001',
    file: 'file_a.pdf',
    printed: '2',
    createdBy: 'Vũ Thị Hoa',
    createdAt: '2024-08-01 10:30:00',
  },
  // Thêm các phiếu kiểm nghiệm khác ở đây
];

const InspectionSheet = () => {
  const handleSendEmail = (id) => {
    console.log(`Gửi email cho phiếu kiểm nghiệm ${id}`);
  };

  const handleEdit = (id) => {
    console.log(`Sửa phiếu kiểm nghiệm ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Xóa phiếu kiểm nghiệm ${id}`);
  };

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Tên sản phẩm | Mã sản phẩm"
          className="border py-2 rounded-md px-4"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Tìm kiếm
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Tạo phiếu
        </button>
        <div className="flex-grow"></div>
        <button
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
              <th className="py-2 px-4 text-left">Sản phẩm</th>
              <th className="py-2 px-4 text-left">Mã sản phẩm</th>
              <th className="py-2 px-4 text-left">Số lô</th>
              <th className="py-2 px-4 text-left">File</th>
              <th className="py-2 px-4 text-left">Đã in</th>
              <th className="py-2 px-4 text-left">Người tạo</th>
              <th className="py-2 px-4 text-left">Thời gian tạo</th>
              <th className="py-2 px-4 text-left">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {inspectionSheets.map((sheet, index) => (
              <tr key={sheet.id} className="border-b border-gray-200">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{sheet.product}</td>
                <td className="py-2 px-4">{sheet.productCode}</td>
                <td className="py-2 px-4">{sheet.batchNumber}</td>
                <td className="py-2 px-4">
                  <a href={`/files/${sheet.file}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                    {sheet.file}
                  </a>
                </td>
                <td className="py-2 px-4">{sheet.printed}</td>
                <td className="py-2 px-4">{sheet.createdBy}</td>
                <td className="py-2 px-4">{sheet.createdAt}</td>
                <td className="py-2 px-4 flex space-x-2">
                  <button
                    onClick={() => handleSendEmail(sheet.id)}
                    className=" bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Gửi Email
                  </button>
                  <button
                    onClick={() => handleEdit(sheet.id)}
                    className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(sheet.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
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

export default InspectionSheet;
