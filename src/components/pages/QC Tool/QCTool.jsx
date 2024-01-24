import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';
import TableQC from './TableQC';


function QCTool() {
  const { handleSubmit, control, reset } = useForm();
  const [qcData, setQCData] = useState([]);

  // Load dữ liệu từ localStorage khi component được tải
  useEffect(() => {
    const savedQCData = localStorage.getItem('qcData');
    if (savedQCData) {
      setQCData(JSON.parse(savedQCData));
    }
  }, []);

  // Lưu dữ liệu vào localStorage khi có sự thay đổi
  useEffect(() => {
    localStorage.setItem('productData', JSON.stringify(qcData));
  }, [qcData]);

  const onSubmit = (data) => {
    setQCData([...qcData, data]);
    // reset(); // Đặt lại form sau khi submit
  };

  return (
    <div className="bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Data entry QC</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white p-4 shadow-md rounded-md">
          <div className="grid grid-cols-4 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Mã K Kiểm Định </label>
              <Controller
                name="maKiemdinh"
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
              <label className="block text-sm font-medium text-gray-600">Ngày sản xuất:</label>
              <Controller
                name="ngaySanXuat"
                control={control}
                defaultValue=""
                render={({ field }) => <input {...field} type="date" className="border rounded-md p-2 w-full" />}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Ngày Nhập Mẫu:</label>
              <Controller
                name="ngayNhapmau"
                control={control}
                defaultValue=""
                render={({ field }) => <input {...field} type="date" className="border rounded-md p-2 w-full" />}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Tiêu chuẩn kiểm định</label>
              <Controller
                name="tieuChuan"
                control={control}
                defaultValue=""
                render={({ field }) => <input {...field} className="border rounded-md p-2 w-full" />}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Nhân Viên QC</label>
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
          Tạo mẫu kiểm định
        </button>
      </form>
      <TableQC qcData={qcData} />
      
      
    </div>
  );
}

export default QCTool;
