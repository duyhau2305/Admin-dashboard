import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import QCReportDisplay from './QCReportDisplay';

function QCReport() {
  const { handleSubmit, control, reset } = useForm();
  const [reportData, setReportData] = useState({
    maKiemdinh: '',
    batch: '',
    tenSanPham: '',
    ngayNhapmau: '',
    ketQua: 'Đạt Tiêu Chuẩn', // Default value
  });
  const [submitted, setSubmitted] = useState(false);
  const [savedReports, setSavedReports] = useState([]);

  // Load savedReports from localStorage when the component is loaded
  useEffect(() => {
    const savedReportsData = localStorage.getItem('savedReports');
    if (savedReportsData) {
      setSavedReports(JSON.parse(savedReportsData));
    }
  }, []);

  const onSubmit = (data) => {
    setReportData(data);
    setSubmitted(true);

    // Save the submitted data to savedReports
    const updatedSavedReports = [...savedReports, data];
    setSavedReports(updatedSavedReports);

    // Save updatedSavedReports to localStorage
    localStorage.setItem('savedReports', JSON.stringify(updatedSavedReports));
  };

  return (
    <div className="bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">QC Report Page</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white p-4 shadow-md rounded-md">
          <div className="grid grid-cols-4 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Mã K kiểm định</label>
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
              <label className="block text-sm font-medium text-gray-600">Ngày nhập mẫu</label>
              <Controller
                name="ngayNhapmau"
                control={control}
                defaultValue=""
                render={({ field }) => <input {...field} type="date" className="border rounded-md p-2 w-full" />}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600"> Tieu chuan ap dung </label>
              <Controller
                name="tieuChuan"
                control={control}
                defaultValue=""
                render={({ field }) => <input {...field} className="border rounded-md p-2 w-full" />}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Kết Quả</label>
              <Controller
                name="ketQua"
                control={control}
                defaultValue="Đạt Tiêu Chuẩn"
                render={({ field }) => (
                  <select {...field} className="border rounded-md p-2 w-full">
                    <option value="Đạt Tiêu Chuẩn">Đạt Tiêu Chuẩn</option>
                    <option value="Không Đạt">Không Đạt</option>
                  </select>
                )}
              />
            </div>
          </div>
        </div>
        <button type="submit" className="bg-emerald-400 text-white px-4 py-2 mt-4 mb-2 rounded-md">
          Gửi Báo Cáo
        </button>
      </form>
      {submitted && <QCReportDisplay data={reportData} savedReports={savedReports} />}
    </div>
  );
}

export default QCReport;
