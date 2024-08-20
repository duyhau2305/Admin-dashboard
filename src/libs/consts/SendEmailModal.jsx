import React, { useState } from 'react';
import Modal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai';

const SendEmailModal = ({ isOpen, onClose, onSend }) => {
  const [emailData, setEmailData] = useState({
    to: '',
    subject: '',
    body: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSend = () => {
    onSend(emailData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Send Email"
      className="relative bg-white rounded-lg shadow-lg p-4 max-w-lg mx-auto mt-20"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <h2 className="text-xl font-bold">Gửi Email</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <AiOutlineClose size={24} />
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Đến</label>
        <input
          type="email"
          name="to"
          value={emailData.to}
          onChange={handleChange}
          placeholder="Nhập địa chỉ email"
          className="mt-1 p-2 border rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Tiêu đề</label>
        <input
          type="text"
          name="subject"
          value={emailData.subject}
          onChange={handleChange}
          placeholder="Nhập tiêu đề email"
          className="mt-1 p-2 border rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Nội dung</label>
        <textarea
          name="body"
          value={emailData.body}
          onChange={handleChange}
          placeholder="Nhập nội dung email"
          className="mt-1 p-2 border rounded w-full h-40 resize-none"
        />
      </div>

      <div className="flex justify-end space-x-2">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
        >
          Hủy
        </button>
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Gửi
        </button>
      </div>
    </Modal>
  );
};

export default SendEmailModal;
