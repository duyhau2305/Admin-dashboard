import React, { useState } from 'react';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ExportExcelButton from './pages/QC Tool/TP/ExportExcelButton';
import DynamicFormModal from './pages/QC Tool/TP/DynamicFormModal';

const ProductionOrders = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentOrderIndex, setCurrentOrderIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [productionOrders, setProductionOrders] = useState([
    {
      orderCode: 'L001',
      batch: 'B0012345678',
      productCode: 'PRD001',
      productName: 'Sản phẩm A',
      dosageForm: 'Viên',
      printedQty: 1000,
      quantity: 800,
      unit: 'viên',
      productDate: '2024-08-16'
    },
    // Add more sample data as needed
  ]);

  const formFields = [
    { name: 'orderCode', label: 'Lệnh sản xuất', placeholder: 'Nhập lệnh sản xuất' },
    { name: 'batch', label: 'Số lô', placeholder: 'Nhập số lô' },
    { name: 'productCode', label: 'Mã hàng hóa', placeholder: 'Nhập mã hàng hóa' },
    { name: 'productName', label: 'Tên hàng hóa', placeholder: 'Nhập tên hàng hóa' },
    { name: 'dosageForm', label: 'Dạng bào chế', placeholder: 'Nhập dạng bào chế' },
    { name: 'printedQty', label: 'Số lượng in', placeholder: 'Nhập số lượng in', type: 'number' },
    { name: 'quantity', label: 'Số lượng sản xuất', placeholder: 'Nhập số lượng sản xuất', type: 'number' },
    { name: 'unit', label: 'Đơn vị tính', placeholder: 'Nhập đơn vị tính' },
    { name: 'productDate', label: 'Ngày sản xuất', placeholder: 'Chọn ngày sản xuất', type: 'date' }
  ];

  const handleAddOrder = () => {
    setIsEditing(false);
    setCurrentOrderIndex(null);
    setIsModalOpen(true);
  };

  const handleEditOrder = (index) => {
    setIsEditing(true);
    setCurrentOrderIndex(index);
    setIsModalOpen(true);
  };

  const handleDeleteOrder = (index) => {
    const newOrders = productionOrders.filter((_, i) => i !== index);
    setProductionOrders(newOrders);
    toast.success('Xóa thành công Lệnh sản xuất!');
  };

  const handleSaveOrder = (newOrder) => {
    if (isEditing && currentOrderIndex !== null) {
      const updatedOrders = productionOrders.map((order, index) =>
        index === currentOrderIndex ? newOrder : order
      );
      setProductionOrders(updatedOrders);
      toast.success('Cập nhật Lệnh sản xuất thành công!');
    } else {
      setProductionOrders([...productionOrders, newOrder]);
      toast.success('Thêm Lệnh sản xuất thành công!');
    }
    setIsModalOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredOrders = productionOrders.filter((order) =>
    Object.values(order).some((value) => value.toString().toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-4">
      {/* Header with buttons */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Tên hàng hóa| NCode"
            className="border p-2 rounded-md"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Tìm kiếm</button>
          <button
            onClick={handleAddOrder}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Thêm mới
          </button>
        </div>

        <div>
          <ExportExcelButton data={filteredOrders} />
        </div>
      </div>

      {/* Table for displaying production orders */}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border whitespace-nowrap">Lệnh sản xuất</th>
            <th className="py-2 px-4 border">Số lô</th>
            <th className="py-2 px-4 border">Mã hàng hóa</th>
            <th className="py-2 px-4 border">Tên hàng hóa</th>
            <th className="py-2 px-4 border">Dạng bào chế</th>
            <th className="py-2 px-4 border">Số lượng in</th>
            <th className="py-2 px-4 border">Số lượng sản xuất</th>
            <th className="py-2 px-4 border">Đơn vị tính</th>
            <th className="py-2 px-4 border">Ngày sản xuất</th>
            <th className="py-2 px-4 border">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border">{order.orderCode}</td>
              <td className="py-2 px-4 border">{order.batch}</td>
              <td className="py-2 px-4 border">{order.productCode}</td>
              <td className="py-2 px-4 border">{order.productName}</td>
              <td className="py-2 px-4 border">{order.dosageForm}</td>
              <td className="py-2 px-4 border">{order.printedQty}</td>
              <td className="py-2 px-4 border">{order.quantity}</td>
              <td className="py-2 px-4 border">{order.unit}</td>
              <td className="py-2 px-4 border">{order.productDate}</td>
              <td className="py-2 px-4 flex flex-center space-x-2">
                <button
                  onClick={() => handleEditOrder(index)}
                  className="text-blue-500 hover:underline"
                >
                  <AiFillEdit />
                </button>
                <button
                  onClick={() => handleDeleteOrder(index)}
                  className="text-red-500 hover:underline"
                >
                  <AiFillDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for adding/editing orders */}
      <DynamicFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveOrder}
        formFields={formFields}
        contentLabel={isEditing ? 'Chỉnh sửa Lệnh sản xuất' : 'Thêm Lệnh sản xuất'}
        initialData={isEditing ? productionOrders[currentOrderIndex] : {}}
      />

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default ProductionOrders;
