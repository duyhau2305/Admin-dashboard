import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal"; // Import React Modal
import { FaEdit, FaTrash } from "react-icons/fa"; // Import các icon

const HelpAndSupport = () => {
  const [issue, setIssue] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [description, setDescription] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [supportRequests, setSupportRequests] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditIndex, setCurrentEditIndex] = useState(null);

  // Load data from API when component mounts
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing && currentEditIndex !== null) {
      // Update the existing request
      const currentRequest = supportRequests[currentEditIndex];
      try {
        const response = await axios.put(`http://localhost:5000/api/support-requests/${currentRequest._id}`, {
          issue,
          priority,
          description,
        });
        const updatedRequests = supportRequests.map((request, index) =>
          index === currentEditIndex ? response.data : request
        );
        setSupportRequests(updatedRequests);
      } catch (error) {
        console.error("Error updating request:", error);
      }
      setIsEditing(false);
      setCurrentEditIndex(null);
    } else {
      // Add new request
      try {
        const response = await axios.post("http://localhost:5000/api/support-requests", {
          issue,
          priority,
          description,
        });
        setSupportRequests([...supportRequests, response.data]);
      } catch (error) {
        console.error("Error creating request:", error);
      }
    }

    setIsSuccessModalOpen(true);
    setIssue("");
    setPriority("Normal");
    setDescription("");
  };

  const handleEdit = (index) => {
    const request = supportRequests[index];
    setIssue(request.issue);
    setPriority(request.priority);
    setDescription(request.description);
    setIsEditing(true);
    setCurrentEditIndex(index);
  };

  const handleDelete = async (index) => {
    const requestId = supportRequests[index]._id;
    try {
      await axios.delete(`http://localhost:5000/api/support-requests/${requestId}`);
      const updatedRequests = supportRequests.filter((_, i) => i !== index);
      setSupportRequests(updatedRequests);
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Yêu cầu hỗ trợ</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="issue">
            Loại vấn đề
          </label>
          <input
            className="border rounded-lg w-full py-2 px-3"
            type="text"
            id="issue"
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priority">
            Mức độ ưu tiên
          </label>
          <select
            className="border rounded-lg w-full py-2 px-3"
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Normal">Bình thường</option>
            <option value="High">Cao</option>
            <option value="Urgent">Khẩn cấp</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Mô tả chi tiết
          </label>
          <textarea
            className="border rounded-lg w-full py-2 px-3 h-32 resize-none"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div>
          <button
            className="bg-emerald-400 text-white py-2 px-4 rounded-full hover:bg-blue-600"
            type="submit"
          >
            {isEditing ? "Cập nhật yêu cầu" : "Gửi yêu cầu"}
          </button>
        </div>
      </form>

      {/* Modal thành công */}
      <Modal
        isOpen={isSuccessModalOpen}
        onRequestClose={() => setIsSuccessModalOpen(false)}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2 className="text-xl font-bold mb-4">Yêu cầu của bạn đã được {isEditing ? "cập nhật" : "gửi"} thành công!</h2>
        <p>Cảm ơn bạn đã liên hệ với chúng tôi. Chúng tôi sẽ xử lý yêu cầu của bạn trong thời gian sớm nhất.</p>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 mt-4"
          onClick={() => setIsSuccessModalOpen(false)}
        >
          Đóng
        </button>
      </Modal>

      {/* Hiển thị danh sách yêu cầu hỗ trợ */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Danh sách yêu cầu hỗ trợ</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Loại vấn đề</th>
              <th className="border border-gray-300 px-4 py-2">Mức độ ưu tiên</th>
              <th className="border border-gray-300 px-4 py-2">Mô tả chi tiết</th>
              <th className="border border-gray-300 px-4 py-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {supportRequests.map((request, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{request.issue}</td>
                <td className="border border-gray-300 px-4 py-2">{request.priority}</td>
                <td className="border border-gray-300 px-4 py-2">{request.description}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    className="text-blue-500 hover:underline mr-2"
                    onClick={() => handleEdit(index)}
                  >
                    <FaEdit className="inline-block text-lg" /> {/* Icon sửa */}
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDelete(index)}
                  >
                    <FaTrash className="inline-block text-lg" /> {/* Icon xóa */}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HelpAndSupport;
