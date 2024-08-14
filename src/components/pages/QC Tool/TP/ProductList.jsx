import React, { useState } from 'react';

function ProductList() {
  const [productData, setProductData] = useState([
    {
      id: 1,
      productName: 'Thành phẩm A',
      batch: 'TP001',
      location: 'Kho A',
      quantityIn: 500,
      quantityOut: 200,
      unit: 'Kg',
      expiryDate: '01/01/2025',
      notes: 'Lô hàng cần kiểm tra',
    },
    {
      id: 2,
      productName: 'Thành phẩm B',
      batch: 'TP002',
      location: 'Kho B',
      quantityIn: 1000,
      quantityOut: 500,
      unit: 'L',
      expiryDate: '05/12/2024',
      notes: 'Lô hàng dùng cho dự án X',
    },
    // Add more product data here...
  ]);

  const handleFileUpload = (e, id) => {
    const file = e.target.files[0];
    console.log(`File uploaded for product ID ${id}:`, file.name);
    // Xử lý upload file tại đây (ví dụ: gửi file lên server)
  };

  return (
    <div className="container mx-auto mt-3">
      <div className="sticky top-0 bg-white z-10 p-2">
        <div className="flex items-center gap-2 mb-2 mt-2">
          <input
            type="text"
            placeholder="Hóa chất | Product Name"
            className="border p-1 rounded-md text-sm px-2"
          />
          <button className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm">Tìm kiếm</button>
          <button className="bg-green-500 text-white px-3 py-1 rounded-md text-sm">Thêm mới</button>
          <div className="flex-grow"></div>
          <button className="bg-yellow-500 text-white px-3 py-1 rounded-md text-xs">Xuất Excel</button>
        </div>
      </div>

      <table className="min-w-full bg-white border">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="p-2 text-xs whitespace-nowrap">STT</th>
            <th className="p-2 text-xs whitespace-nowrap">Thành phẩm</th>
            <th className="p-2 text-xs whitespace-nowrap">Số lô</th>
            <th className="p-2 text-xs whitespace-nowrap">Vị trí</th>
            <th className="p-2 text-xs whitespace-nowrap">Lượng nhập</th>
            <th className="p-2 text-xs whitespace-nowrap">Lượng xuất</th>
            <th className="p-2 text-xs whitespace-nowrap">Lượng tồn</th>
            <th className="p-2 text-xs whitespace-nowrap">Đơn vị tính</th>
            <th className="p-2 text-xs whitespace-nowrap">PKN</th>
            <th className="p-2 text-xs whitespace-nowrap">Hạn dùng</th>
            <th className="p-2 text-xs whitespace-nowrap">Ghi chú</th>
          </tr>
        </thead>
        <tbody>
          {productData.map((item, index) => (
            <tr key={item.id} className="border-b">
              <td className="p-2 text-xs">{index + 1}</td>
              <td className="p-2 text-xs whitespace-nowrap">{item.productName}</td>
              <td className="p-2 text-xs">{item.batch}</td>
              <td className="p-2 whitespace-nowrap text-xs">{item.location}</td>
              <td className="p-2 text-xs">{item.quantityIn}</td>
              <td className="p-2 text-xs">{item.quantityOut}</td>
              <td className="p-2 text-xs">{item.quantityIn - item.quantityOut}</td>
              <td className="p-2 text-xs">{item.unit}</td>
              <td className="p-2 text-xs">
                <input
                  type="file"
                  onChange={(e) => handleFileUpload(e, item.id)}
                  className="text-sm"
                />
              </td>
              <td className="p-2 text-xs">{item.expiryDate}</td>
              <td className="p-2 text-xs">{item.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
