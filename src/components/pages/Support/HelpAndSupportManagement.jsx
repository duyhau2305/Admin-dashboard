import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import {jwtDecode} from "jwt-decode"; // Sử dụng jwtDecode từ jwt-decode

const HelpAndSupportManagement = () => {
  const [supportRequests, setSupportRequests] = useState([]);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [emailContent, setEmailContent] = useState("");
  const [recipientEmail, setRecipientEmail] = useState(""); // Thêm trường nhập email

  // Fetch data from API when component mounts
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/support-requests");
        setSupportRequests(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRequests();
  }, []);

  const handleSendEmail = (request) => {
    setSelectedRequest(request);

    // Lấy token từ localStorage hoặc cookie
    const token = localStorage.getItem("token"); // Hoặc lấy từ cookie nếu bạn lưu trữ ở đó
    if (token) {
      try {
        const decoded = jwtDecode(token); // Giải mã token
        setRecipientEmail(decoded.user.email); // Lấy email từ token và đặt vào trường email
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }

    setEmailContent(""); // Reset email content
    setIsEmailModalOpen(true);
  };
  const handleEmailSend = async () => {
    if (!selectedRequest) return;

    try {
      await axios.post("http://localhost:5000/api/support-requests/send-email", {
        recipientEmail: recipientEmail,
        subject: "Hướng dẫn giải quyết vấn đề",
        emailContent: emailContent,
      });

      await axios.put(`http://localhost:5000/api/support-requests/${selectedRequest._id}`, {
        status: "Đã gửi email hướng dẫn",
        emailContent: emailContent,
      });

      const updatedRequests = supportRequests.map((request) =>
        request._id === selectedRequest._id
          ? { ...request, status: "Đã gửi email hướng dẫn" }
          : request
      );
      setSupportRequests(updatedRequests);

      setIsEmailModalOpen(false);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Quản Lý Yêu Cầu Hỗ Trợ</h1>

      {supportRequests.length > 0 ? (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Danh sách yêu cầu hỗ trợ</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Loại vấn đề</th>
                <th className="border border-gray-300 px-4 py-2">Mức độ ưu tiên</th>
                <th className="border border-gray-300 px-4 py-2">Mô tả chi tiết</th>
                <th className="border border-gray-300 px-4 py-2">Trạng thái</th>
                <th className="border border-gray-300 px-4 py-2">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {supportRequests.map((request) => (
                <tr key={request._id}>
                  <td className="border border-gray-300 px-4 py-2">{request.issue}</td>
                  <td className="border border-gray-300 px-4 py-2">{request.priority}</td>
                  <td className="border border-gray-300 px-4 py-2">{request.description}</td>
                  <td className="border border-gray-300 px-4 py-2">{request.status || "Chưa hướng dẫn"}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleSendEmail(request)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700"
                    >
                      Gửi Email
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-8">Không có yêu cầu hỗ trợ nào.</p>
      )}

      {/* Modal for sending email */}
      <Modal
        isOpen={isEmailModalOpen}
        onRequestClose={() => setIsEmailModalOpen(false)}
        className="modal"
        overlayClassName="modal-overlay"
        style={{
          content: {
            maxWidth: "600px",
            margin: "auto",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            backgroundColor: "#f8f9fa",
            border: "1px solid #dee2e6"
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)"
          }
        }}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Gửi Email Giải Quyết Vấn Đề</h2>
        {selectedRequest && (
          <div className="mb-4 text-left">
            <p className="mb-2">
              <strong>Loại vấn đề:</strong> {selectedRequest.issue}
            </p>
            <p className="mb-2">
              <strong>Mức độ ưu tiên:</strong> {selectedRequest.priority}
            </p>
            <p className="mb-4">
              <strong>Mô tả chi tiết:</strong> {selectedRequest.description}
            </p>
          </div>
        )}
        <div className="mb-4 text-left">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="recipientEmail">
            Email người nhận
          </label>
          <input
            className="border rounded-lg w-full py-2 px-3 text-gray-700 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="email"
            id="recipientEmail"
            value={recipientEmail}
            readOnly // Chỉ đọc vì được lấy từ token
          />
        </div>
        <textarea
          className="border rounded-lg w-full py-2 px-3 mb-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Nhập hướng dẫn giải quyết..."
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
          required
        ></textarea>
        <div className="flex justify-end">
          <button
            onClick={() => setIsEmailModalOpen(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded-full mr-2 hover:bg-gray-700"
          >
            Hủy
          </button>
          <button
            onClick={handleEmailSend}
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700"
          >
            Gửi
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default HelpAndSupportManagement;
