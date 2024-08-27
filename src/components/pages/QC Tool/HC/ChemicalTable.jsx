import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import DynamicFormModal from '../../../../libs/consts/DynamicFormModal';
import ExportExcelButton from '../../../../libs/consts/ExportExcelButton';

function ChemicalTable() {
  const [chemicals, setChemicals] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedChemical, setSelectedChemical] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/chemicals')
      .then(response => {
        setChemicals(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const openModal = (chemical = null) => {
    setSelectedChemical(chemical);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedChemical(null);
  };

  const handleSave = (formData) => {
    if (selectedChemical) {
      axios.put(`http://localhost:5000/api/chemicals/${selectedChemical.id}`, formData)
        .then(response => {
          setChemicals(
            chemicals.map((chem) => (chem.id === selectedChemical.id ? response.data : chem))
          );
          closeModal();
        })
        .catch(error => {
          setError(error.message);
        });
    } else {
      axios.post('http://localhost:5000/api/chemicals', formData)
        .then(response => {
          setChemicals([...chemicals, response.data]);
          closeModal();
        })
        .catch(error => {
          setError(error.message);
        });
    }
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/chemicals/${id}`)
      .then(() => {
        setChemicals(chemicals.filter((chem) => chem.id !== id));
      })
      .catch(error => {
        setError(error.message);
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto mt-2">
      <div className="sticky top-0 bg-white z-10 p-2">
        <div className="flex items-center gap-2 mb-2">
          <input
            type="text"
            placeholder="Hóa chất | Product Name"
            className="border p-1 rounded-md text-sm px-2"
          />
          <button className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm">Tìm kiếm</button>
          <button className="bg-green-500 text-white px-3 py-1 rounded-md text-sm" onClick={() => openModal()}>Thêm mới</button>
          <div className="flex-grow"></div>
          <ExportExcelButton data={chemicals} parentComponentName="ChemicalTable" />
        </div>
      </div>

      <table className="min-w-full bg-white border">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="p-2 text-xs border">STT</th>
            <th className="p-2 text-xs border">Trạng thái</th>
            <th className="p-2 text-xs border">Tên Hóa Chất</th>
            <th className="p-2 text-xs border">Loại Hóa Chất</th>
            <th className="p-2 text-xs border">Đơn Vị</th>
            <th className="p-2 text-xs border">Nhà Sản Xuất</th>
            <th className="p-2 text-xs border">Quốc Gia</th>
            <th className="p-2 text-xs border">Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {chemicals.map((chemical, index) => (
            <tr key={chemical.id}>
              <td className="p-2 text-xs border">{index + 1}</td>
              <td className={`p-2 text-xs border ${getStatusClass(chemical.status)}`}>{chemical.status}</td>
              <td className="p-2 text-xs border">{chemical.name}</td>
              <td className="p-2 text-xs border">{chemical.typeChemical}</td>
              <td className="p-2 text-xs border">{chemical.unit}</td>
              <td className="p-2 text-xs border">{chemical.manufacturer}</td>
              <td className="p-2 text-xs border">{chemical.country}</td>
              <td className="p-2 text-xs text-center border">
                <button
                  className="text-blue-500 mr-2"
                  onClick={() => openModal(chemical)}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-500"
                  onClick={() => handleDelete(chemical.id)}
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <DynamicFormModal
          isOpen={modalOpen}
          onClose={closeModal}
          onSave={handleSave}
          initialData={selectedChemical}
          formFields={[
            { name: 'status', label: 'Trạng thái', type: 'text' },
            { name: 'name', label: 'Tên Hóa Chất', type: 'text' },
            { name: 'typeChemical', label: 'Loại Hóa Chất', type: 'text' },
            { name: 'unit', label: 'Đơn Vị', type: 'text' },
            { name: 'manufacturer', label: 'Nhà Sản Xuất', type: 'text' },
            { name: 'country', label: 'Quốc Gia', type: 'text' },
          ]}
          contentLabel={selectedChemical ? 'Chỉnh sửa hóa chất' : 'Thêm mới hóa chất'}
        />
      )}
    </div>
  );
}

// Helper function to get the CSS class for the status
const getStatusClass = (status) => {
  switch (status) {
    case 'Mới tạo':
      return 'text-blue-500';
    case 'Đã kiểm tra':
      return 'text-green-500';
    case 'Không đạt':
      return 'text-red-500';
    default:
      return '';
  }
};

export default ChemicalTable;
