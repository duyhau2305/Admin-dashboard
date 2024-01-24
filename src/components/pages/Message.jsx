import React, { useState, useEffect } from 'react';

const Message = () => {
  const [contacts] = useState([
    { id: 1, name: 'Duy Hậu' },
    { id: 2, name: 'Vũ Hoa' },
    { id: 3, name: 'Anh Minh' },
  ]);

  const [activeContact, setActiveContact] = useState(contacts[0]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState('');

  const meaningfulMessages = [
    "Chào! Bạn có thể giúp tôi với vấn đề này không?",
    "Tôi đã hoàn thành công việc của mình.",
    "Hôm nay thời tiết rất đẹp!",
    "Cuối tuần này tôi có kế hoạch đi du lịch.",
  ];

  // Giả lập tin nhắn từ liên hệ kia
  useEffect(() => {
    const interval = setInterval(() => {
      if (activeContact) {
        const randomIndex = Math.floor(Math.random() * meaningfulMessages.length);
        const randomMessage = meaningfulMessages[randomIndex];

        const message = {
          text: `Tin nhắn từ ${activeContact.name}: ${randomMessage}`,
          isSent: false,
        };
        setMessages([...messages, message]);
      }
    }, 3000); // Tạo tin nhắn mới mỗi 3 giây

    return () => clearInterval(interval);
  }, [activeContact, messages]);

  const handleSendMessage = () => {
    if (newMessage || selectedFile) {
      const message = {
        text: `Tin nhắn từ bạn: ${newMessage}`,
        icon: selectedIcon,
        file: selectedFile,
        isSent: true,
      };
      setMessages([...messages, message]);
      setNewMessage('');
      setSelectedIcon('');
      setSelectedFile(null);
    }
  };

  const fileInputRef = React.createRef();

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/4 p-4 bg-gray-200">
        <h2 className="text-xl font-semibold mb-4">Danh bạ</h2>
        <ul>
          {contacts.map((contact) => (
            <li
              key={contact.id}
              className={`cursor-pointer hover:bg-gray-300 p-2 rounded ${
                activeContact.id === contact.id ? 'bg-blue-300' : ''
              }`}
              onClick={() => setActiveContact(contact)}
            >
              {contact.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-3/4 p-4 bg-white">
        <h2 className="text-xl font-semibold mb-4">
          Cuộc trò chuyện với {activeContact.name}
        </h2>
        <div className="mb-4 h-64 overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-2 p-2 rounded-lg ${
                message.isSent ? 'ml-auto bg-blue-300' : 'mr-auto bg-gray-300'
              }`}
            >
              {message.icon && <span>{message.icon} </span>}
              {message.text}
              {message.file && (
                <div>
                  Đính kèm tệp: {message.file.name}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex">
          
          <div
            className="border-dashed border-2 p-2 rounded-lg cursor-pointer"
            onClick={handleFileButtonClick}
          >
            📎 Đính kèm tệp
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
          <input
            type="text"
            className="flex-1 border p-2 rounded-l-lg"
            placeholder="Nhập tin nhắn..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white p-2 rounded-r-lg"
            onClick={handleSendMessage}
          >
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
};

export default Message;
