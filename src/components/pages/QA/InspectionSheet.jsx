import React, { useState } from 'react';
import DynamicFormModal from '../../../libs/consts/DynamicFormModal';
import ExportExcelButton from '../../../libs/consts/ExportExcelButton';

const inspectionSheets = [
  // Dữ liệu phiếu kiểm nghiệm của bạn ở đây
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
];

const InspectionSheet = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái mở/đóng modal
  const [initialData, setInitialData] = useState(null); // Dữ liệu ban đầu cho modal

  // Các trường biểu mẫu
  const formFields = [
    { name: 'product', label: 'Sản phẩm', placeholder: 'Nhập tên sản phẩm', type: 'text' },
    { name: 'productCode', label: 'Mã sản phẩm', placeholder: 'Nhập mã sản phẩm', type: 'text' },
    { name: 'batchNumber', label: 'Số lô', placeholder: 'Nhập số lô', type: 'text' },
    { name: 'file', label: 'File', placeholder: 'Chọn file', type: 'text' },
    { name: 'printed', label: 'Đã in', placeholder: 'Nhập số lượng in', type: 'text' },
    { name: 'createdBy', label: 'Người tạo', placeholder: 'Nhập tên người tạo', type: 'text' },
    { name: 'createdAt', label: 'Thời gian tạo', placeholder: 'Chọn thời gian', type: 'datetime-local' },
  ];

  // Hàm mở modal để tạo phiếu mới
  const handleCreate = () => {
    setInitialData(null); // Không có dữ liệu ban đầu khi tạo phiếu mới
    setIsModalOpen(true);
  };

  // Hàm xử lý khi lưu dữ liệu từ modal
  const handleSave = (data) => {
    console.log('Dữ liệu đã lưu:', data);
    // Thực hiện logic lưu dữ liệu
  };

  // Hàm xử lý khi người dùng nhấn nút "Sửa"
  const handleEdit = (id) => {
    const sheet = inspectionSheets.find(sheet => sheet.id === id);
    setInitialData(sheet); // Đặt dữ liệu ban đầu cho modal
    setIsModalOpen(true);
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
          onClick={handleCreate} // Gọi hàm tạo phiếu mới
        >
          Tạo phiếu
        </button>
        <div className="flex-grow"></div>
        <ExportExcelButton
          data={inspectionSheets} // Dữ liệu cần xuất
          parentComponentName="InspectionSheets" // Tên của component cha
        />
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
                    onClick={() => handleEdit(sheet.id)} // Gọi hàm xử lý sửa phiếu kiểm nghiệm
                    className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => console.log(`Xóa phiếu kiểm nghiệm ID: ${sheet.id}`)}
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

      {/* Modal form động */}
      <DynamicFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        formFields={formFields}
        contentLabel="Phiếu Kiểm Nghiệm"
        initialData={initialData}
      />
    </div>
  );
};

export default InspectionSheet;
