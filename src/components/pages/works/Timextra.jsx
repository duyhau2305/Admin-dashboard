import React, { useState } from 'react';

const OvertimeRegistration = () => {
  const [registrations, setRegistrations] = useState([
    {
      id: 1,
      employeeId: 'E001',
      employeeName: 'Nguyen Van A',
      date: '2024-08-01',
      startTime: '18:00',
      endTime: '21:00',
      hours: 3,
      reason: 'Dự án đặc biệt',
      createdAt: '2024-08-01 12:00',
      status: 'Đã duyệt'
    },
    {
      id: 2,
      employeeId: 'E002',
      employeeName: 'Le Thi B',
      date: '2024-08-02',
      startTime: '19:00',
      endTime: '22:00',
      hours: 3,
      reason: 'Hoàn thành công việc',
      createdAt: '2024-08-02 14:00',
      status: 'Chờ duyệt'
    },
    // Add more registrations as needed
  ]);

  const handleCreate = () => {
    alert('Tạo phiếu làm thêm giờ mới!');
    // Logic for creating a new overtime registration
  };

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={handleCreate}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Tạo phiếu
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="py-2 px-4 text-left">STT</th>
              <th className="py-2 px-4 text-left">Mã nhân viên</th>
              <th className="py-2 px-4 text-left">Tên nhân viên</th>
              <th className="py-2 px-4 text-left">Ngày</th>
              <th className="py-2 px-4 text-left">Giờ bắt đầu</th>
              <th className="py-2 px-4 text-left">Giờ kết thúc</th>
              <th className="py-2 px-4 text-left">Số giờ</th>
              <th className="py-2 px-4 text-left">Lý do</th>
              <th className="py-2 px-4 text-left">Thời gian tạo</th>
              <th className="py-2 px-4 text-left">Trạng thái</th>
             
            </tr>
          </thead>
          <tbody>
            {registrations.map((registration, index) => (
              <tr key={registration.id} className="border-b border-gray-200">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{registration.employeeId}</td>
                <td className="py-2 px-4">{registration.employeeName}</td>
                <td className="py-2 px-4">{registration.date}</td>
                <td className="py-2 px-4">{registration.startTime}</td>
                <td className="py-2 px-4">{registration.endTime}</td>
                <td className="py-2 px-4">{registration.hours}</td>
                <td className="py-2 px-4">{registration.reason}</td>
                <td className="py-2 px-4">{registration.createdAt}</td>
                <td className="py-2 px-4">{registration.status}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OvertimeRegistration;
