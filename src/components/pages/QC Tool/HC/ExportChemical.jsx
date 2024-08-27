import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import DynamicFormModal from '../../../../libs/consts/DynamicFormModal';
import ExportExcelButton from '../../../../libs/consts/ExportExcelButton';

function ExportChemical() {
  const [exportData, setExportData] = useState([
    {
      id: 1,
      status: 'Đã xuất',
      tag: 'Tem1234',
      chemicalName: 'Ethanol 96%',
      batch: 'ET123456',
      quantity: '500',
      unit: 'L',
      notes: 'Sử dụng cho pha loãng',
      exportedBy: 'Nguyễn Văn A',
      exportDate: '10/08/2024',
    },
    {
      id: 2,
      status: 'Chờ xuất',
      tag: 'Tem5678',
      chemicalName: 'Axit Acetic',
      batch: 'AA654321',
      quantity: '200',
      unit: 'L',
      notes: 'Dùng cho thí nghiệm',
      exportedBy: 'Nguyễn Văn B',
      exportDate: '08/08/2024',
    },
    // Add more export data here...
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item = null) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };

  const handleSave = (formData) => {
    if (selectedItem) {
      setExportData(
        exportData.map((item) => (item.id === selectedItem.id ? { ...formData, id: item.id } : item))
      );
    } else {
      setExportData([...exportData, { ...formData, id: exportData.length + 1 }]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    setExportData(exportData.filter((item) => item.id !== id));
  };

  return (
    <div className="container mx-auto mt-5">
      <div className="top-0 bg-white z-10 p-2">
        <div className="flex items-center gap-2 mb-2">
          <input
            type="text"
            placeholder="Hóa chất | Product Name"
            className="border p-1 rounded-md text-sm px-2"
          />
          <button className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm">Tìm kiếm</button>
          <button
            className="bg-green-500 text-white px-3 py-1 rounded-md text-sm"
            onClick={() => openModal()}
          >
            Xuất HC
          </button>
          <div className="flex-grow"></div>
          <ExportExcelButton data={exportData} parentComponentName="ExportChemical" />
        </div>
      </div>

      <table className="min-w-full bg-white border">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="p-2 text-xs">STT</th>
            <th className="p-2 text-xs">Trạng thái</th>
            <th className="p-2 text-xs">Tem</th>
            <th className="p-2 text-xs">Tên Hóa Chất</th>
            <th className="p-2 text-xs">Số lô</th>
            <th className="p-2 text-xs">Lượng Xuất</th>
            <th className="p-2 text-xs">Đơn vị tính</th>
            <th className="p-2 text-xs">Ghi chú</th>
            <th className="p-2 text-xs">Người Xuất</th>
            <th className="p-2 text-xs">Ngày Xuất</th>
            <th className="p-2 text-xs">Actions</th>
          </tr>
        </thead>
        <tbody>
          {exportData.map((item, index) => (
            <tr key={item.id} className="border-b">
              <td className="p-2 text-xs">{index + 1}</td>
              <td className="p-2 text-xs">{item.status}</td>
              <td className="p-2 text-xs">{item.tag}</td>
              <td className="p-2 text-xs">{item.chemicalName}</td>
              <td className="p-2 text-xs">{item.batch}</td>
              <td className="p-2 text-xs">{item.quantity}</td>
              <td className="p-2 text-xs">{item.unit}</td>
              <td className="p-2 text-xs">{item.notes}</td>
              <td className="p-2 text-xs">{item.exportedBy}</td>
              <td className="p-2 text-xs">{item.exportDate}</td>
              <td className="p-2 flex space-x-2">
                <button className="text-blue-500" onClick={() => openModal(item)}>
                  <FaEdit />
                </button>
                <button className="text-red-500" onClick={() => handleDelete(item.id)}>
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <DynamicFormModal
        isOpen={modalOpen}
        onClose={closeModal}
        onSave={handleSave}
        formFields={[
          { name: 'status', label: 'Trạng thái' },
          { name: 'tag', label: 'Tem' },
          { name: 'chemicalName', label: 'Tên Hóa Chất' },
          { name: 'batch', label: 'Số lô' },
          { name: 'quantity', label: 'Lượng Xuất' },
          { name: 'unit', label: 'Đơn vị tính' },
          { name: 'notes', label: 'Ghi chú' },
          { name: 'exportedBy', label: 'Người Xuất' },
          { name: 'exportDate', label: 'Ngày Xuất', type: 'date' },
        ]}
        contentLabel={selectedItem ? 'Chỉnh sửa xuất hóa chất' : 'Thêm mới xuất hóa chất'}
        initialData={selectedItem}
      />
    </div>
  );
}

export default ExportChemical;
