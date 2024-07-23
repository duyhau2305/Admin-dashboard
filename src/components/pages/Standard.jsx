import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Modal from 'react-modal';

Modal.setAppElement('#root');

const Standard = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const [imageSrc, setImageSrc] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const openModal = () => {
    setModalIsOpen(true);
    startCamera();
  };

  const closeModal = () => {
    setModalIsOpen(false);
    stopCamera();
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    openModal();
  };

  const startCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error('Error accessing webcam: ', err));
  };

  const stopCamera = () => {
    let stream = videoRef.current.srcObject;
    let tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
  };

  const captureImage = () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    setImageSrc(canvasRef.current.toDataURL('image/png'));
  };

  const handleCheckIn = () => {
    setCheckInTime(new Date().toLocaleTimeString());
    captureImage();
  };

  const handleCheckOut = () => {
    setCheckOutTime(new Date().toLocaleTimeString());
    captureImage();
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <header className="bg-blue-600 text-white p-4 w-full text-center">
        <h1 className="text-2xl">Công ty Dược phẩm - Chấm Công Cá Nhân</h1>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center">
        <div className="bg-white shadow-md rounded p-6 w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Chọn ngày chấm công</h2>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            className="w-full p-2 border rounded"
            placeholderText="Chọn ngày"
          />
        </div>
      </main>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Check-in / Check-out"
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className="flex flex-col items-center">
          <h2 className="text-2xl mb-4">Check-in / Check-out</h2>
          <video ref={videoRef} autoPlay className="w-full h-64 bg-black mb-4"></video>
          <canvas ref={canvasRef} width="640" height="480" className="hidden"></canvas>
          <button 
            onClick={handleCheckIn} 
            className="bg-green-500 text-white px-4 py-2 rounded mb-4 w-full"
          >
            Check In
          </button>
          <button 
            onClick={handleCheckOut} 
            className="bg-red-500 text-white px-4 py-2 rounded w-full"
          >
            Check Out
          </button>
          {imageSrc && <img src={imageSrc} alt="Captured" className="mt-4"/>}
          <button 
            onClick={closeModal} 
            className="bg-gray-500 text-white px-4 py-2 rounded mt-4"
          >
            Đóng
          </button>
        </div>
      </Modal>
      <footer className="bg-blue-600 text-white p-4 w-full text-center">
        &copy; 2024 Công ty Dược phẩm
      </footer>
    </div>
  );
};

export default Standard;
