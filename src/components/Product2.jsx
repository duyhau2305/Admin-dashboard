// src/components/Product2.js
import React, { useState } from 'react';
import { FaSearch, FaPlus, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { AiOutlineFileExcel } from 'react-icons/ai';
import * as XLSX from 'xlsx';

const Product2 = () => {
  const [products, setProducts] = useState([
    { id: 1, name: '[N01041] Nước cất ống nhựa - 5ml', batch: '050124', creator: 'Phạm Thị Lan', createdAt: '11:01 12/07/2024', file: 'FILE', printed: 7 },
    { id: 2, name: '[U00118] Ulcogen 800mg', batch: '050224', creator: 'Phạm Thị Lan', createdAt: '11:01 12/07/2024', file: 'FILE', printed: 0 },
    { id: 3, name: '[S01280] Safoli - 1 vỉ x 15 viên', batch: '020224', creator: 'Phạm Thị Lan', createdAt: '16:05 11/07/2024', file: 'FILE', printed: 0 },
    { id: 4, name: '[Z00328] Zensoid 200 Inhaler - Hộp 1 lọ 200 liều xịt', batch: '020224', creator: 'Phạm Thị Lan', createdAt: '15:53 11/07/2024', file: 'FILE', printed: 0 },
    { id: 5, name: '[K00669] Kem răng miệng Laforin red toothpaste - Hộp 1 tuýp 180g', batch: '416', creator: 'Phạm Thị Lan', createdAt: '15:52 11/07/2024', file: 'FILE', printed: 0 },
    { id: 6, name: '[K00669] Kem răng miệng Laforin red toothpaste - Hộp 1 tuýp 180g', batch: '416', creator: 'Phạm Thị Lan', createdAt: '15:52 11/07/2024', file: 'FILE', printed: 0 },
    { id: 7, name: '[K00669] Kem răng miệng Laforin red toothpaste - Hộp 1 tuýp 180g', batch: '416', creator: 'Phạm Thị Lan', createdAt: '15:52 11/07/2024', file: 'FILE', printed: 0 },
    { id: 8, name: '[K00669] Kem răng miệng Laforin red toothpaste - Hộp 1 tuýp 180g', batch: '416', creator: 'Phạm Thị Lan', createdAt: '15:52 11/07/2024', file: 'FILE', printed: 0 },
    { id: 9, name: '[K00669] Kem răng miệng Laforin red toothpaste - Hộp 1 tuýp 180g', batch: '416', creator: 'Phạm Thị Lan', createdAt: '15:52 11/07/2024', file: 'FILE', printed: 0 },
    { id: 10, name: '[K00669] Kem răng miệng Laforin red toothpaste - Hộp 1 tuýp 180g', batch: '416', creator: 'Phạm Thị Lan', createdAt: '15:52 11/07/2024', file: 'FILE', printed: 0 }
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  // Calculate the indexes for the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Export to Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(products);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Products');
    XLSX.writeFile(wb, 'products.xlsx');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <input type="text" placeholder="Sản phẩm..." className="px-4 py-2 border border-gray-300 rounded"/>
          <input type="text" placeholder="Số lô..." className="px-4 py-2 border border-gray-300 rounded"/>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center">
            <FaSearch className="mr-2"/> Tìm kiếm
          </button>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center">
            <FaPlus className="mr-2"/> Tạo mới
          </button>
          <button onClick={exportToExcel} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center">
            <AiOutlineFileExcel className="mr-2"/> Xuất Excel
          </button>
        </div>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">#</th>
            <th className="py-2">Sản phẩm</th>
            <th className="py-2">Số lô</th>
            <th className="py-2">Người tạo</th>
            <th className="py-2">TG tạo</th>
            <th className="py-2">File</th>
            <th className="py-2">Đã in</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product, index) => (
            <tr key={product.id} className="text-center">
              <td className="py-2">{indexOfFirstProduct + index + 1}</td>
              <td className="py-2">{product.name}</td>
              <td className="py-2">{product.batch}</td>
              <td className="py-2">{product.creator}</td>
              <td className="py-2">{product.createdAt}</td>
              <td className="py-2 text-blue-500 hover:underline cursor-pointer">{product.file}</td>
              <td className="py-2">{product.printed}</td>
              <td className="py-2 flex justify-center space-x-2">
                <button className="px-2 py-1 text-blue-600 hover:text-blue-800"><FaEye /></button>
                <button className="px-2 py-1 text-yellow-600 hover:text-yellow-800"><FaEdit /></button>
                <button className="px-2 py-1 text-red-600 hover:text-red-800"><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end mt-4">
        <nav>
          <ul className="flex space-x-2">
            {pageNumbers.map(number => (
              <li key={number}>
                <button 
                  onClick={() => paginate(number)} 
                  className={`px-3 py-1 rounded ${currentPage === number ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}>
                  {number}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Product2;
