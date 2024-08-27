import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import DynamicFormModal from '../../../libs/consts/DynamicFormModal';
import ExportExcelButton from '../../../libs/consts/ExportExcelButton';
import { toast } from 'react-toastify';

const ResultNguyenLieu = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/resultsNguyenlieu')
      .then(response => {
        setData(response.data);
        setFilteredData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const openModal = (item = null) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };

  const handleSave = (formData) => {
    if (selectedItem) {
      axios.put(`http://localhost:5000/api/resultsNguyenlieu/${selectedItem._id}`, formData)
        .then(response => {
          setData(data.map(item => item._id === selectedItem._id ? response.data : item));
          setFilteredData(data.map(item => item._id === selectedItem._id ? response.data : item));
          closeModal();
          toast.success('Cập nhật thành công!');
        })
        .catch(error => {
          setError(error.message);
          toast.error('Có lỗi xảy ra khi cập nhật!');
        });
    } else {
      axios.post('http://localhost:5000/api/resultsNguyenlieu', formData)
        .then(response => {
          setData([...data, response.data]);
          setFilteredData([...data, response.data]);
          closeModal();
          toast.success('Thêm mới thành công!');
        })
        .catch(error => {
          setError(error.message);
          toast.error('Có lỗi xảy ra khi thêm mới!');
        });
    }
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/resultsNguyenlieu/${id}`)
      .then(() => {
        setData(data.filter(item => item._id !== id));
        setFilteredData(filteredData.filter(item => item._id !== id));
        toast.success('Xóa thành công!');
      })
      .catch(error => {
        setError(error.message);
        toast.error('Có lỗi xảy ra khi xóa!');
      });
  };

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    if (term.trim() !== '') {
      const filtered = data.filter(item =>
        item.kNumber.toLowerCase().includes(term.toLowerCase()) ||
        item.material.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Đã nhận':
        return 'text-blue-500';
      case 'Đạt':
        return 'text-green-500';
      case 'Không đạt':
        return 'text-red-500';
      default:
        return 'text-gray-800';
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Số K | Tên sản phẩm"
            className="border p-2 rounded-md text-sm"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button className="bg-blue-500 text-white px-3 py-2 rounded-md text-sm flex items-center gap-2">
            <FaSearch />
            Tìm kiếm
          </button>
          <button
            className="bg-green-500 text-white px-3 py-2 rounded-md text-sm"
            onClick={() => openModal()}
          >
            Báo cáo
          </button>
        </div>
        <div className="flex gap-2">
          <ExportExcelButton data={filteredData} parentComponentName="ResultNguyenLieu" />
        </div>
      </div>

      <table className="w-full border-collapse text-xs">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-1 py-1 text-xs">STT</th>
            <th className="border px-1 py-1 text-xs">Trạng thái</th>
            <th className="border px-1 py-1 text-xs">Số K</th>
            <th className="border px-1 py-1 text-xs">Nguyên liệu</th>
            <th className="border px-1 py-1 text-xs">Số lô</th>
            <th className="border px-1 py-1 text-xs">Ngày sản xuất</th>
            <th className="border px-1 py-1 text-xs">Hạn dùng</th>
            <th className="border px-1 py-1 text-xs">Lượng lấy</th>
            <th className="border px-1 py-1 text-xs">Tình trạng mẫu</th>
            <th className="border px-1 py-1 text-xs">File</th>
            <th className="border px-1 py-1 text-xs">Ngày trả KQ</th>
            <th className="border px-1 py-1 text-xs">Nơi lấy mẫu</th>
            <th className="border px-1 py-1 text-xs">Người lấy</th>
            <th className="border px-1 py-1 text-xs">Ngày lấy</th>
            <th className="py-2 px-2 text-center border">
              {filteredData.map((item) => (
                <div key={item._id}>
                  <button
                    className="text-blue-500"
                    onClick={() => openModal(item)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => handleDelete(item._id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={item._id}>
              <td className="border px-1 py-1 text-xs">{index + 1}</td>
              <td className={`border px-1 py-1 text-xs ${getStatusColor(item.status)}`}>{item.status}</td>
              <td className="border px-1 py-1 text-xs">{item.kNumber}</td>
              <td className="border px-1 py-1 text-xs">{item.material}</td>
              <td className="border px-1 py-1 text-xs">{item.lotNumber}</td>
              <td className="border px-1 py-1 text-xs">{item.productionDate}</td>
              <td className="border px-1 py-1 text-xs">{item.expiryDate}</td>
              <td className="border px-1 py-1 text-xs">{item.weight}</td>
              <td className="border px-1 py-1 text-xs">{item.statusSample}</td>
              <td className="border px-1 py-1 text-xs">{item.file}</td>
              <td className="border px-1 py-1 text-xs">{item.resultDate}</td>
              <td className="border px-1 py-1 text-xs">{item.placesample}</td>
              <td className="border px-1 py-1 text-xs">{item.user}</td>
              <td className="border px-1 py-1 text-xs">{item.entryDate}</td>
              <td className="py-2 px-2 text-center border">
                <button
                  className="text-blue-500"
                  onClick={() => openModal(item)}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-500"
                  onClick={() => handleDelete(item._id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <DynamicFormModal
        isOpen={modalOpen}
        onClose={closeModal}
        onSave={handleSave}
        formFields={[
          { name: 'status', label: 'Trạng thái' },
          { name: 'kNumber', label: 'Số K' },
          { name: 'material', label: 'Nguyên liệu' },
          { name: 'lotNumber', label: 'Số lô' },
          { name: 'productionDate', label: 'Ngày sản xuất' },
          { name: 'expiryDate', label: 'Hạn dùng' },
          { name: 'weight', label: 'Lượng lấy' },
          { name: 'statusSample', label: 'Tình trạng mẫu' },
          { name: 'file', label: 'File' },
          { name: 'resultDate', label: 'Ngày trả KQ' },
          { name: 'placesample', label: 'Nơi lấy mẫu' },
          { name: 'user', label: 'Người lấy' },
          { name: 'entryDate', label: 'Ngày lấy' },
        ]}
        contentLabel={selectedItem ? 'Chỉnh sửa nguyên liệu' : 'Thêm nguyên liệu mới'}
        initialData={selectedItem}
      />
    </div>
  );
};

export default ResultNguyenLieu;
