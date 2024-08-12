import React, { useState } from "react";
import Modal from "react-modal"; // Import React Modal

const HelpAndSupportManagement = () => {
  const [supportRequests, setSupportRequests] = useState([
    { id: 1, issue: "Lỗi đăng nhập", priority: "Cao", description: "Không thể đăng nhập vào hệ thống.", status: "Pending" },
    { id: 2, issue: "Không nhận được email", priority: "Bình thường", description: "Tôi không nhận được email xác nhận.", status: "Pending" },
  ]);

  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleConfirm = (id) => {
    const updatedRequests = supportRequests.map((request) =>
      request.id === id ? { ...request, status: "Confirmed" } : request
    );
    setSupportRequests(updatedRequests);
  };

  const handleReject = (id) => {
    const updatedRequests = supportRequests.map((request) =>
      request.id === id ? { ...request, status: "Rejected" } : request
    );
    setSupportRequests(updatedRequests);
  };

  const handleSendEmail = (request) => {
    setSelectedRequest(request);
    setIsEmailModalOpen(true);
  };

  const handleEmailSend = () => {
    console.log("Sending email for:", selectedRequest);
    setIsEmailModalOpen(false);
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
                <tr key={request.id}>
                  <td className="border border-gray-300 px-4 py-2">{request.issue}</td>
                  <td className="border border-gray-300 px-4 py-2">{request.priority}</td>
                  <td className="border border-gray-300 px-4 py-2">{request.description}</td>
                  <td className="border border-gray-300 px-4 py-2">{request.status}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleConfirm(request.id)}
                      className="bg-green-500 text-white px-4 py-2 rounded-full mr-2 hover:bg-green-700"
                    >
                      Xác nhận
                    </button>
                    <button
                      onClick={() => handleReject(request.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-full mr-2 hover:bg-red-700"
                    >
                      Từ chối
                    </button>
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
          },
        }}
      >
        <h2 className="text-2xl font-bold mb-4">Gửi Email Giải Quyết Vấn Đề</h2>
        {selectedRequest && (
          <div className="mb-4">
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
        <textarea
          className="border rounded-lg w-full py-2 px-3 mb-2 h-32 resize-none focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Nhập hướng dẫn giải quyết..."
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
