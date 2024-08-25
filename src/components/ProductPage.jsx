import React, { useState, useEffect, useMemo, useCallback, Suspense } from 'react';
// Import các thư viện cần thiết
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import ExportExcelButton from '../libs/consts/ExportExcelButton';
import FormatDate from '../libs/consts/FormatDate'; // Đảm bảo đường dẫn đúng

// Sử dụng React.lazy để lazy load DynamicFormModal
const DynamicFormModal = React.lazy(() => import('../libs/consts/DynamicFormModal'));

const ProductionOrders = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [tempSearchQuery, setTempSearchQuery] = useState('');
  const [productionOrders, setProductionOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchProductionOrders().finally(() => setLoading(false));
  }, []);

  const fetchProductionOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/production-orders');
      setProductionOrders(response.data);
    } catch (error) {
      toast.error('Không thể lấy danh sách đơn hàng sản xuất');
    }
  };

  const filteredOrders = useMemo(() => {
    return productionOrders.filter((order) =>
      Object.values(order).some((value) =>
        value.toString().toLowerCase().includes(tempSearchQuery.toLowerCase())
      )
    );
  }, [productionOrders, tempSearchQuery]);

  const handleAddOrder = useCallback(() => {
    setIsEditing(false);
    setCurrentOrder(null);
    setIsModalOpen(true);
  }, []);

  const handleEditOrder = useCallback((order) => {
    setIsEditing(true);
    setCurrentOrder(order);
    setIsModalOpen(true);
  }, []);

  const handleDeleteOrder = useCallback(async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/production-orders/${id}`);
      setProductionOrders(productionOrders.filter(order => order._id !== id));
      toast.success('Xóa thành công đơn hàng sản xuất');
    } catch (error) {
      toast.error('Không thể xóa đơn hàng sản xuất');
    }
  }, [productionOrders]);

  const handleSaveOrder = async (newOrder) => {
    if (isEditing && currentOrder) {
      try {
        await axios.put(`http://localhost:5000/api/production-orders/${currentOrder._id}`, newOrder);
        setProductionOrders(
          productionOrders.map(order =>
            order._id === currentOrder._id ? { ...newOrder, _id: currentOrder._id } : order
          )
        );
        toast.success('Cập nhật đơn hàng sản xuất thành công');
      } catch (error) {
        toast.error('Không thể cập nhật đơn hàng sản xuất');
      }
    } else {
      try {
        const response = await axios.post('http://localhost:5000/api/production-orders', newOrder);
        setProductionOrders([...productionOrders, response.data]);
        toast.success('Thêm đơn hàng sản xuất thành công');
      } catch (error) {
        toast.error('Không thể thêm đơn hàng sản xuất');
      }
    }
    setIsModalOpen(false);
  };

  const handleSearchChange = (e) => {
    setTempSearchQuery(e.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Tên hàng hóa | NCode"
            value={tempSearchQuery}
            onChange={handleSearchChange}
            className="border p-2 rounded-md"
          />
          <button
            onClick={handleAddOrder}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
          >
            Thêm mới
          </button>
        </div>

        <div>
          <ExportExcelButton
            data={filteredOrders}
            parentComponentName="ProductionOrders"
          />
        </div>
      </div>

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
              <td className="py-2 px-4 border">
                <FormatDate date={order.productDate} /> {/* Sử dụng FormatDate để định dạng ngày */}
              </td>
              <td className="py-2 px-4 text-center border">
                <button
                  onClick={() => handleEditOrder(order)}
                  className="text-blue-500 hover:underline inline-block align-middle mr-2"
                >
                  <AiFillEdit />
                </button>
                <button
                  onClick={() => handleDeleteOrder(order._id)}
                  className="text-red-500 hover:underline inline-block align-middle"
                >
                  <AiFillDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Suspense fallback={<div>Loading Modal...</div>}>
        <DynamicFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveOrder}
          formFields={formFields}
          contentLabel={isEditing ? 'Chỉnh sửa Lệnh sản xuất' : 'Thêm Lệnh sản xuất'}
          initialData={isEditing ? currentOrder : {}}
        />
      </Suspense>

      <ToastContainer />
    </div>
  );
};

export default ProductionOrders;
