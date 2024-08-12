import React, { useState } from 'react';

const ShiftReportTable = () => {
  const [editing, setEditing] = useState(false);
  const [reports, setReports] = useState([
    {
      date: '2024-08-07',
      shift: 'Sáng',
      shiftLeader: 'Nguyễn Văn A',
      productionOrder: 'PO12345',
      plannedQty: '1000',
      actualQty: '950',
    },
    {
      date: '2024-08-07',
      shift: 'Chiều',
      shiftLeader: 'Trần Thị B',
      productionOrder: 'PO12346',
      plannedQty: '2000',
      actualQty: '2050',
    }
  ]);

  const [currentReportIndex, setCurrentReportIndex] = useState(null);
  const [report, setReport] = useState({
    date: '',
    shift: '',
    shiftLeader: '',
    productionOrder: '',
    plannedQty: '',
    actualQty: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReport((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendEmail = () => {
    alert('Đã gửi email!');
  };

  const handleEdit = (index) => {
    setEditing(true);
    setCurrentReportIndex(index);
    setReport(reports[index]);
  };

  const handleDelete = (index) => {
    const updatedReports = reports.filter((_, i) => i !== index);
    setReports(updatedReports);
    alert('Đã xóa báo cáo!');
  };

  const handleSave = () => {
    const updatedReports = [...reports];
    updatedReports[currentReportIndex] = report;
    setReports(updatedReports);
    setEditing(false);
    alert('Đã lưu báo cáo!');
  };

  const handleCancel = () => {
    setEditing(false);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Lệnh sản xuất | NCode"
          className="border p-2 rounded-md px-4"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Tìm kiếm</button>
        <button className="bg-green-500 text-white px-4 py-2 rounded-md">Thêm mới báo cáo</button>
        <div className="flex-grow"></div>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded-md">Xuất Excel</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ca</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trưởng ca</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lệnh sản xuất</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số lượng kế hoạch</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số lượng thực tế</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reports.map((r, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{r.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{r.shift}</td>
                <td className="px-6 py-4 whitespace-nowrap">{r.shiftLeader}</td>
                <td className="px-6 py-4 whitespace-nowrap">{r.productionOrder}</td>
                <td className="px-6 py-4 whitespace-nowrap">{r.plannedQty}</td>
                <td className="px-6 py-4 whitespace-nowrap">{r.actualQty}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {!editing || currentReportIndex !== index ? (
                    <>
                      <button
                        onClick={() => handleSendEmail()}
                        className="bg-green-500 text-white px-2 py-1 rounded-md mr-2"
                      >
                        Gửi Email
                      </button>
                      <button
                        onClick={() => handleEdit(index)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded-md mr-2"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="bg-red-500 text-white px-2 py-1 rounded-md"
                      >
                        Xóa
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handleSave}
                        className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
                      >
                        Lưu
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-gray-300 text-gray-800 px-2 py-1 rounded-md"
                      >
                        Hủy
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShiftReportTable;
