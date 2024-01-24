import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';
import TableProduct from './pages/TableProduct';

function ProductPage() {
  const { handleSubmit, control, reset } = useForm();
  const [productData, setProductData] = useState([]);

  // Load dữ liệu từ localStorage khi component được tải
  useEffect(() => {
    const savedProductData = localStorage.getItem('productData');
    if (savedProductData) {
      setProductData(JSON.parse(savedProductData));
    }
  }, []);

  // Lưu dữ liệu vào localStorage khi có sự thay đổi
  useEffect(() => {
    localStorage.setItem('productData', JSON.stringify(productData));
  }, [productData]);

  const onSubmit = (data) => {
    setProductData([...productData, data]);
    // reset(); // Đặt lại form sau khi submit
  };

  return (
    <div className="bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Product Page</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white p-4 shadow-md rounded-md">
          <div className="grid grid-cols-4 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Mã Sản phẩm </label>
              <Controller
                name="maSanpham"
                control={control}
                defaultValue=""
                render={({ field }) => <input {...field} className="border rounded-md p-2 w-full" />}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Batch</label>
              <Controller
                name="batch"
                control={control}
                defaultValue=""
                render={({ field }) => <input {...field} className="border rounded-md p-2 w-full" />}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Tên sản phẩm</label>
              <Controller
                name="tenSanPham"
                control={control}
                defaultValue=""
                render={({ field }) => <input {...field} className="border rounded-md p-2 w-full" />}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Loại sản phẩm</label>
              <Controller
                name="type"
                control={control}
                defaultValue=""
                render={({ field }) => <input {...field} className="border rounded-md p-2 w-full" />}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Ca sản xuất:</label>
              <Controller
                name="caSanXuat"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <select {...field} className="border rounded-md p-2 w-full">
                    <option value="">Chọn ca sản xuất</option>
                    <option value="Ca 1">Ca 1 - 6h00 : 14h00 </option>
                    <option value="Ca 2">Ca 2 - 14h00 : 22h00 </option>
                    <option value="Ca 3">Ca 3 - 22h00 : 6h00</option>
                  </select>
                )}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Ngày sản xuất:</label>
              <Controller
                name="ngaySanXuat"
                control={control}
                defaultValue=""
                render={({ field }) => <input {...field} type="date" className="border rounded-md p-2 w-full" />}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Nhân Viên</label>
              <Controller
                name="nhanvien"
                control={control}
                defaultValue=""
                render={({ field }) => <input {...field} className="border rounded-md p-2 w-full" />}
              />
            </div>
          </div>
        </div>
        <button type="submit" className="bg-emerald-400 text-white px-4 py-2 mt-4 rounded-md">
          Tạo lô sản xuất
        </button>
      </form>
      <TableProduct productData={productData} />
      <Link to="/" className="no-underline mt-4 block text-blue-600 hover:no-underline hover:text-blue-900">
        Go to Dashboard
      </Link>
    </div>
  );
}

export default ProductPage;
