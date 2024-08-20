import React, { useState, useEffect } from 'react';
import { AiFillEdit, AiFillDelete, AiOutlineSearch, AiOutlineMail } from 'react-icons/ai';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import ExportExcelButton from '../libs/consts/ExportExcelButton';
import DynamicFormModal from '../libs/consts/DynamicFormModal';
import FormatDate from '../libs/consts/FormatDate';
import SendEmailModal from '../libs/consts/SendEmailModal';

const ShiftReportTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentReport, setCurrentReport] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [shiftReports, setShiftReports] = useState([]);
  const [productionOrders, setProductionOrders] = useState([]);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailReport, setEmailReport] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productionOrdersResponse = await axios.get('http://localhost:5000/api/production-orders');
        setProductionOrders(productionOrdersResponse.data);

        const shiftReportsResponse = await axios.get('http://localhost:5000/api/shift-reports');
        setShiftReports(shiftReportsResponse.data);
      } catch (error) {
        toast.error('Không thể lấy dữ liệu từ server');
      }
    };

    fetchData();
  }, []);

  const formFields = [
    { name: 'date', label: 'Ngày', placeholder: 'Chọn ngày', type: 'date' },
    { name: 'shift', label: 'Ca', placeholder: 'Nhập ca làm việc' },
    { name: 'shiftLeader', label: 'Trưởng ca', placeholder: 'Nhập tên trưởng ca' },
    {
      name: 'productionOrder',
      label: 'Lệnh sản xuất',
      type: 'select',
      options: productionOrders.map(order => ({ label: order.orderCode, value: order._id })),
      placeholder: 'Chọn lệnh sản xuất'
    },
    { name: 'plannedQty', label: 'Số lượng kế hoạch', placeholder: 'Nhập số lượng kế hoạch', type: 'number' },
    { name: 'actualQty', label: 'Số lượng thực tế', placeholder: 'Nhập số lượng thực tế', type: 'number' }
  ];

  const handleAddReport = () => {
    setIsEditing(false);
    setCurrentReport(null);
    setIsModalOpen(true);
  };

  const handleEditReport = (report) => {
    setIsEditing(true);
    setCurrentReport(report);
    setIsModalOpen(true);
  };

  const handleDeleteReport = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/shift-reports/${id}`);
      setShiftReports(shiftReports.filter(report => report._id !== id));
      toast.success('Xóa thành công báo cáo ca làm việc');
    } catch (error) {
      toast.error('Không thể xóa báo cáo ca làm việc');
    }
  };

  const handleSaveReport = async (newReport) => {
    if (isEditing && currentReport) {
      try {
        await axios.put(`http://localhost:5000/api/shift-reports/${currentReport._id}`, newReport);
        setShiftReports(
          shiftReports.map(report =>
            report._id === currentReport._id ? { ...newReport, _id: currentReport._id } : report
          )
        );
        toast.success('Cập nhật báo cáo ca làm việc thành công');
      } catch (error) {
        toast.error('Không thể cập nhật báo cáo ca làm việc');
      }
    } else {
      try {
        const response = await axios.post('http://localhost:5000/api/shift-reports', newReport);
        setShiftReports([...shiftReports, response.data]);
        toast.success('Thêm báo cáo ca làm việc thành công');
      } catch (error) {
        toast.error('Không thể thêm báo cáo ca làm việc');
      }
    }
    setIsModalOpen(false);
  };

  const handleSearch = () => {
    const filteredReports = shiftReports.filter((report) =>
      Object.values(report).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setShiftReports(filteredReports);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleOpenEmailModal = (report) => {
    setEmailReport(report);
    setIsEmailModalOpen(true);
  };

  const handleSendEmail = (emailData) => {
    // Gửi email với dữ liệu emailData và emailReport
    console.log('Sending email with data:', emailData, emailReport);
    // Thực hiện gửi email thông qua API hoặc phương thức khác
    toast.success('Email đã được gửi thành công');
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Lệnh sản xuất | NCode"
            value={searchQuery}
            onChange={handleSearchChange}
            className="border p-2 rounded-md"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition flex items-center"
          >
            <AiOutlineSearch className="mr-2" /> Tìm kiếm
          </button>
          <button
            onClick={handleAddReport}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Thêm mới
          </button>
        </div>

        <div>
          <ExportExcelButton 
            data={shiftReports} 
            parentComponentName="ShiftReportTable"
          />
        </div>
      </div>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border whitespace-nowrap">Ngày</th>
            <th className="py-2 px-4 border">Ca</th>
            <th className="py-2 px-4 border">Trưởng ca</th>
            <th className="py-2 px-4 border">Lệnh sản xuất</th>
            <th className="py-2 px-4 border">Số lượng kế hoạch</th>
            <th className="py-2 px-4 border">Số lượng thực tế</th>
            <th className="py-2 px-4 border">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {shiftReports.map((report, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border">
                <FormatDate date={report.date} /> {/* Sử dụng FormatDate để định dạng ngày */}
              </td>
              <td className="py-2 px-4 border">{report.shift}</td>
              <td className="py-2 px-4 border">{report.shiftLeader}</td>
              <td className="py-2 px-4 border">
                {
                  productionOrders.find(order => order._id === report.productionOrder)?.orderCode
                }
              </td>
              <td className="py-2 px-4 border">{report.plannedQty}</td>
              <td className="py-2 px-4 border">{report.actualQty}</td>
              <td className="py-2 px-4 text-center border">
                <button
                  onClick={() => handleEditReport(report)}
                  className="text-blue-500 hover:underline mr-2"
                >
                  <AiFillEdit />
                </button>
                <button
                  onClick={() => handleDeleteReport(report._id)}
                  className="text-red-500 hover:underline mr-2"
                >
                  <AiFillDelete />
                </button>
                <button
                  onClick={() => handleOpenEmailModal(report)}
                  className="text-green-500 hover:underline mr-2"
                >
                  <AiOutlineMail />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <DynamicFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveReport}
        formFields={formFields}
        contentLabel={isEditing ? 'Chỉnh sửa báo cáo ca làm việc' : 'Thêm mới báo cáo ca làm việc'}
        initialData={isEditing ? currentReport : {}}
      />

      <SendEmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        onSend={handleSendEmail}
      />

      <ToastContainer />
    </div>
  );
};

export default ShiftReportTable;
