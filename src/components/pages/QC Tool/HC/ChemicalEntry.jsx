import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import DynamicFormModal from '../../../../libs/consts/DynamicFormModal';
import ExportExcelButton from '../../../../libs/consts/ExportExcelButton';

function ChemicalEntry() {
  const [chemicals, setChemicals] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedChemical, setSelectedChemical] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    axios.get('http://localhost:5000/api/chemical-entries')
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
      axios.put(`http://localhost:5000/api/chemical-entries/${selectedChemical._id}`, formData)
        .then(response => {
          setChemicals(
            chemicals.map((chem) => (chem._id === selectedChemical._id ? response.data : chem))
          );
          closeModal();
        })
        .catch(error => {
          setError(error.message);
        });
    } else {
      axios.post('http://localhost:5000/api/chemical-entries', formData)
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
    axios.delete(`http://localhost:5000/api/chemical-entries/${id}`)
      .then(() => {
        setChemicals(chemicals.filter((chem) => chem._id !== id));
      })
      .catch(error => {
        setError(error.message);
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto mt-5">
      <div className="top-0 bg-white z-10 p-2">
        <div className="flex items-center gap-2 mb-2">
          <input
            type="text"
            placeholder="Hóa chất | Product Name"
            className="border p-1 rounded-md text-sm px-2"
          />
          <button className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm">Tìm kiếm</button>
          <button
            className="bg-green-500 text-white px-3 py-1 rounded-md text-sm"
            onClick={() => openModal()}
          >
            Nhập mới
          </button>
          <div className="flex-grow"></div>
          <ExportExcelButton data={chemicals} parentComponentName="ChemicalEntry" />
        </div>
      </div>

      <table className="min-w-full bg-white border">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="border px-1 py-1 text-xs">STT</th>
            <th className="border whitespace-nowrap px-1 py-1 text-xs">Ngày nhập</th>
            <th className="border whitespace-nowrap px-1 py-1 text-xs">Người nhập</th>
            <th className="border whitespace-nowrap px-1 py-1 text-xs">Trạng thái</th>
            <th className="border whitespace-nowrap px-1 py-1 text-xs">Tên hóa chất</th>
            <th className="border whitespace-nowrap px-1 py-1 text-xs">Số lô</th>
            <th className="border whitespace-nowrap px-1 py-1 text-xs">Khối lượng</th>
            <th className="border whitespace-nowrap px-1 py-1 text-xs">Quy cách</th>
            <th className="border whitespace-nowrap px-1 py-1 text-xs">Giá tiền</th>
            <th className="border whitespace-nowrap px-1 py-1 text-xs">VAT</th>
            <th className="border whitespace-nowrap px-1 py-1 text-xs">Kho</th>
            <th className="border whitespace-nowrap px-1 py-1 text-xs">Nhà SX</th>
            <th className="border whitespace-nowrap px-1 py-1 text-xs">Quốc gia</th>
            <th className="border whitespace-nowrap px-1 py-1 text-xs">Actions</th>
          </tr>
        </thead>
        <tbody>
          {chemicals.map((chemical, index) => (
            <tr key={chemical._id} className="border-b">
              <td className="p-2 text-xs border ">{index + 1}</td>
              <td className="p-2 text-xs border ">{chemical.date}</td>
              <td className="p-2 text-xs border ">{chemical.enteredBy}</td>
              <td className="p-2 text-xs border ">{chemical.status}</td>
              <td className="p-2 text-xs border">{chemical.chemicalName}</td>
              <td className="p-2 text-xs border">{chemical.batch}</td>
              <td className="p-2 text-xs border">{chemical.quantity}</td>
              <td className="p-2 text-xs border">{chemical.unitPrice}</td>
              <td className="p-2 text-xs border">{chemical.totalPrice}</td>
              <td className="p-2 text-xs border">{chemical.VAT}%</td>
              <td className="p-2 text-xs border">{chemical.warehouse}</td>
              <td className="p-2 text-xs border">{chemical.manufacturer}</td>
              <td className="p-2 text-xs border">{chemical.country}</td>
              <td className="p-2 text-center border
              ">
                <button className="text-blue-500" onClick={() => openModal(chemical)}>
                  <FaEdit />
                </button>
                <button className="text-red-500" onClick={() => handleDelete(chemical._id)}>
                  <FaTrashAlt />
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
          { name: 'date', label: 'Ngày nhập', type: 'date' },
          { name: 'enteredBy', label: 'Người nhập' },
          { name: 'status', label: 'Trạng thái' },
          { name: 'chemicalName', label: 'Tên hóa chất' },
          { name: 'batch', label: 'Số lô' },
          { name: 'quantity', label: 'Khối lượng' },
          { name: 'unitPrice', label: 'Quy cách' },
          { name: 'totalPrice', label: 'Giá tiền' },
          { name: 'VAT', label: 'VAT', type: 'number' },
          { name: 'warehouse', label: 'Kho' },
          { name: 'manufacturer', label: 'Nhà SX' },
          { name: 'country', label: 'Quốc gia' },
        ]}
        contentLabel={selectedChemical ? 'Chỉnh sửa hóa chất' : 'Nhập mới hóa chất'}
        initialData={selectedChemical}
      />
    </div>
  );
}

export default ChemicalEntry;
