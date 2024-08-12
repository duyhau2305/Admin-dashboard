import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Timsheets = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [employees, setEmployees] = useState([
    { id: 24019, name: 'Nguyen Van A', checkIn: '08:00', checkOut: '17:00' },
    { id: 2114, name: 'Le Thi B', checkIn: '09:00', checkOut: '18:00' },
    { id: 2031, name: 'Tran Van C', checkIn: '08:30', checkOut: '17:30' },
    { id: 2114, name: 'Le Thi B', checkIn: '09:00', checkOut: '18:00' },
    { id: 2031, name: 'Tran Van C', checkIn: '08:30', checkOut: '17:30' },
    { id: 2114, name: 'Le Thi B', checkIn: '09:00', checkOut: '18:00' },
    { id: 2031, name: 'Tran Van C', checkIn: '08:30', checkOut: '17:30' },
    // Add more employees as needed
  ]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Logic to fetch and set employee attendance for the selected date can be added here
  };

  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="bg-white shadow-lg rounded p-6 w-full max-w-4xl mb-6">
        <div className="flex items-center gap-4 mb-6">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            className="p-2 border rounded w-full sm:w-auto"
            placeholderText="Chọn ngày"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Tìm kiếm</button>
         
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center">Danh sách chấm công theo ngày</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="py-2 px-4 text-left">STT</th>
                <th className="py-2 px-4 text-left">Mã nhân viên</th>
                <th className="py-2 px-4 text-left">Tên nhân viên</th>
                <th className="py-2 px-4 text-left">Giờ chấm công</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={employee.id} className="border-b border-gray-200">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{employee.id}</td>
                  <td className="py-2 px-4">{employee.name}</td>
                  <td className="py-2 px-4">
                    <div>
                      <strong>Check In:</strong> {employee.checkIn || 'Chưa chấm'}
                    </div>
                    <div>
                      <strong>Check Out:</strong> {employee.checkOut || 'Chưa chấm'}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Timsheets;
