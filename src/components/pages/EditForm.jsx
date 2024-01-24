// EditForm.js
import React, { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const EditForm = ({ isOpen, onClose, rowData, onSave, onCancel }) => {
  const [editedData, setEditedData] = useState({ ...rowData });

  const handleInputChange = (key, value) => {
    setEditedData((prevData) => ({ ...prevData, [key]: value }));
  };

  const handleSaveClick = () => {
    onSave(editedData);
  };

  const handleCancelClick = () => {
    onCancel();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Edit Form Modal"
    >
      <div>
        <h3>Edit Row</h3>
        <form>
          <div>
            <label>Mã Sản phẩm:</label>
            <input
              type="text"
              value={editedData.maSanpham}
              onChange={(e) => handleInputChange('maSanpham', e.target.value)}
            />
          </div>
          <div>
            <label>Batch:</label>
            <input
              type="text"
              value={editedData.batch}
              onChange={(e) => handleInputChange('batch', e.target.value)}
            />
          </div>
          <div>
            <label>Tên sản phẩm:</label>
            <input
              type="text"
              value={editedData.tenSanPham}
              onChange={(e) => handleInputChange('tenSanPham', e.target.value)}
            />
          </div>
          <div>
            <label>Loại sản phẩm:</label>
            <input
              type="text"
              value={editedData.type}
              onChange={(e) => handleInputChange('type', e.target.value)}
            />
          </div>
          <div>
            <label>Ca sản xuất:</label>
            <input
              type="text"
              value={editedData.caSanXuat}
              onChange={(e) => handleInputChange('caSanXuat', e.target.value)}
            />
          </div>
          <div>
            <label>Ngày sản xuất:</label>
            <input
              type="text"
              value={editedData.ngaySanXuat}
              onChange={(e) => handleInputChange('ngaySanXuat', e.target.value)}
            />
          </div>
          <div>
            <label>Nhân viên:</label>
            <input
              type="text"
              value={editedData.nhanvien}
              onChange={(e) => handleInputChange('nhanvien', e.target.value)}
            />
          </div>
          <div>
            <button type="button" onClick={handleSaveClick}>
              Save
            </button>
            <button type="button" onClick={handleCancelClick}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditForm;
