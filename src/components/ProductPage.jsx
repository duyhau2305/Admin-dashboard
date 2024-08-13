import React, { useState } from 'react';
import { FaPlus, FaTrashAlt, FaEdit } from 'react-icons/fa';

const ProductionOrders = () => {
  const [orders, setOrders] = useState([
    { id: 1, orderCode: 'UZ20/0824', batch: '100824', productCode: '[C02593] Gel Iron - Hộp 20 gói 15g', dosageForm: 'Gel thạch', printedQty: 30, intermediateBox: 0, SL1: 30, DV1: 'Hộp', SL2: 20, DV2: 'Gói', specification: 'Hộp 20 gói x 15g/gói', type: 'KSBKT' },
    { id: 2, orderCode: 'UZ19/0824', batch: '090824', productCode: '[C02593] Gel Iron - Hộp 20 gói 15g', dosageForm: 'Gel thạch', printedQty: 30, intermediateBox: 0, SL1: 30, DV1: 'Hộp', SL2: 20, DV2: 'Gói', specification: 'Hộp 20 gói x 15g/gói', type: 'KSBKT' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newOrder, setNewOrder] = useState({
    orderCode: '',
    batch: '',
    productCode: '',
    dosageForm: '',
    printedQty: '',
    intermediateBox: '',
    SL1: '',
    DV1: '',
    SL2: '',
    DV2: '',
    specification: '',
    type: '',
  });

  const handleAddOrder = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewOrder({
      orderCode: '',
      batch: '',
      productCode: '',
      dosageForm: '',
      printedQty: '',
      intermediateBox: '',
      SL1: '',
      DV1: '',
      SL2: '',
      DV2: '',
      specification: '',
      type: '',
    });
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    const orderWithId = { id: Date.now(), ...newOrder };
    setOrders([...orders, orderWithId]);
    handleCloseModal();
  };

  const handleChange = (e) => {
    setNewOrder({ ...newOrder, [e.target.name]: e.target.value });
  };

  const handleDeleteOrder = (id) => {
    setOrders(orders.filter(order => order.id !== id));
  };

  const handleEditOrder = (id) => {
    // Hàm để chỉnh sửa lệnh sản xuất
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Tên sản phẩm | mã sản phẩm"
          className="w-full max-w-xs p-2 border border-gray-300 rounded-md"
        />
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded-md flex items-center hover:bg-blue-700 ml-4"
          onClick={handleAddOrder}
        >
          <FaPlus className="mr-2" /> Thêm mới
        </button>
      </div>
      <div className="p-4 bg-neutral-200 flex-1 overflow-y-auto">
        <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-300">
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">STT</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">Lệnh SX</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">Lô</th>
            <th className="py-3 px-8 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">Sản phẩm</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">Dạng bào chế</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">SL in mã</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">Hộp trung gian</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">SL1</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">ĐV1</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">SL2</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">ĐV2</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">Quy cách</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">Loại</th>
            <th className="py-3 px-4 text-center text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50 transition duration-150 ease-in-out">
              <td className="py-3 px-4 text-xs">{index + 1}</td>
              <td className="py-3 px-4 text-xs">{order.orderCode}</td>
              <td className="py-3 px-4 text-xs">{order.batch}</td>
              <td className="py-3 px-4 text-xs">{order.productCode}</td>
              <td className="py-3 px-4 text-xs">{order.dosageForm}</td>
              <td className="py-3 px-4 text-xs">{order.printedQty}</td>
              <td className="py-3 px-4 text-xs">{order.intermediateBox}</td>
              <td className="py-3 px-4 text-xs">{order.SL1}</td>
              <td className="py-3 px-4 text-xs">{order.DV1}</td>
              <td className="py-3 px-4 text-xs">{order.SL2}</td>
              <td className="py-3 px-4 text-xs">{order.DV2}</td>
              <td className="py-3 px-4 text-xs">{order.specification}</td>
              <td className="py-3 px-4 text-xs">{order.type}</td>
              <td className="py-3 px-4 text-center">
                <button
                  className="text-green-600 hover:text-green-800 mx-2"
                  title="Sửa"
                  onClick={() => handleEditOrder(order.id)}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-600 hover:text-red-800 mx-2"
                  title="Xóa"
                  onClick={() => handleDeleteOrder(order.id)}
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

        </div>

      </div>
      

      {isModalOpen && (
  <div className="fixed inset-0 flex items-center w-full justify-center z-50 bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
      <h2 className="text-lg font-semibold mb-4">Thêm lệnh sản xuất mới</h2>
      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 gap-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Lệnh SX</label>
            <input
              type="text"
              name="orderCode"
              value={newOrder.orderCode}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Lô</label>
            <input
              type="text"
              name="batch"
              value={newOrder.batch}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Sản phẩm</label>
            <input
              type="text"
              name="productCode"
              value={newOrder.productCode}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Dạng bào chế</label>
            <input
              type="text"
              name="dosageForm"
              value={newOrder.dosageForm}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">SL in mã</label>
            <input
              type="number"
              name="printedQty"
              value={newOrder.printedQty}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Hộp trung gian</label>
            <input
              type="number"
              name="intermediateBox"
              value={newOrder.intermediateBox}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">SL1</label>
            <input
              type="number"
              name="SL1"
              value={newOrder.SL1}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">ĐV1</label>
            <input
              type="text"
              name="DV1"
              value={newOrder.DV1}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">SL2</label>
            <input
              type="number"
              name="SL2"
              value={newOrder.SL2}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">ĐV2</label>
            <input
              type="text"
              name="DV2"
              value={newOrder.DV2}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Quy cách</label>
            <input
              type="text"
              name="specification"
              value={newOrder.specification}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Loại</label>
            <input
              type="text"
              name="type"
              value={newOrder.type}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={handleCloseModal}
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md mr-2"
          >
            Đóng
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            Thêm
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
};

export default ProductionOrders;

