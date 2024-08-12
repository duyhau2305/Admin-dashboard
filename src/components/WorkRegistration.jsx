import React, { useState } from 'react';

const WorkRegistration = () => {
  const [registrations, setRegistrations] = useState([
    {
      id: 1,
      type: 'Nghỉ phép',
      daysOff: 2,
      reason: 'Nghỉ ốm',
      createdAt: '2024-08-01 10:00',
      endTime: '2024-08-03 17:00',
      status: 'Đã duyệt'
    },
    {
      id: 2,
      type: 'Nghỉ không lương',
      daysOff: 1,
      reason: 'Việc gia đình',
      createdAt: '2024-08-03 14:00',
      endTime: '2024-08-04 14:00',
      status: 'Chờ duyệt'
    },
    // Add more registrations as needed
  ]);

  const handleCreate = () => {
    alert('Tạo phiếu đăng ký mới!');
    // Logic for creating a new registration
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
              <th className="py-2 px-4 text-left">Loại</th>
              <th className="py-2 px-4 text-left">Số buổi nghỉ</th>
              <th className="py-2 px-4 text-left">Lý do</th>
              <th className="py-2 px-4 text-left">Thời gian tạo</th>
              <th className="py-2 px-4 text-left">Thời gian kết thúc</th>
              <th className="py-2 px-4 text-left">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((registration, index) => (
              <tr key={registration.id} className="border-b border-gray-200">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{registration.type}</td>
                <td className="py-2 px-4">{registration.daysOff}</td>
                <td className="py-2 px-4">{registration.reason}</td>
                <td className="py-2 px-4">{registration.createdAt}</td>
                <td className="py-2 px-4">{registration.endTime}</td>
                <td className="py-2 px-4">{registration.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkRegistration;
