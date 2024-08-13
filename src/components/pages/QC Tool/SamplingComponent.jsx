import React from 'react';

const SamplingComponent = () => {
  const fakeData = [
    {
      id: 1,
      date: '12/08/24',
      user: 'Nguyễn Ngọc Huyền',
      status: 'Chưa lấy mẫu',
      material: 'Màng Cjel Bone 15g',
      lotNumber: 'M2',
      kNumber : 'BB23-362',
      weight: '213200 (GAM)',
      packaging: '1 (Thùng)',
      productionDate: '12/08/24',
      expiryDate: '12/08/25',
      manufacturer: 'Công ty TNHH thương mại và sản xuất Đông Á',
      supplier: 'Guangzhou Yuanyuan Packaging Co., Ltd'
    },
    {
      id: 2,
      date: '10/08/24',
      user: 'Hoàng Thị Lan',
      status: 'Đã lấy mẫu',
      material: 'Plastic Bottle (Chai sữa tắm gội Zentokid 250ml)',
      lotNumber: 'KL',
      kNumber : 'BB23-362',
      weight: '22025 (CÁI)',
      packaging: '11 (Thùng)',
      productionDate: '10/08/24',
      expiryDate: '10/08/25',
      manufacturer: 'GUANGZHOU YUANYUAN PACKAGING CO., LTD',
      supplier: 'Guangzhou Yuanyuan Packaging Co., Ltd'
    },
    {
      id: 3,
      date: '10/08/24',
      user: 'Hoàng Thị Lan',
      status: 'Đã lấy mẫu',
      material: 'Plastic Pump (Đầu bơm chai sữa tắm gội zentokid 250ml)',
      lotNumber: 'KL',
      kNumber : 'BB23-362',
      weight: '20161 (CÁI)',
      packaging: '3 (Thùng)',
      productionDate: '10/08/24',
      expiryDate: '10/08/25',
      manufacturer: 'GUANGZHOU YUANYUAN PACKAGING CO., LTD',
      supplier: 'Guangzhou Yuanyuan Packaging Co., Ltd'
    }
  ];

  return (
    <div className="p-2 bg-white shadow-md rounded-md">
      <div className="sticky left-0 bg-white z-10 p-2">
        <div className="flex items-center gap-2 mb-2">
          <input
            type="text"
            placeholder="Số K | Tên sản phẩm"
            className="border p-1 rounded-md text-xs px-2"
          />
          <button className="bg-blue-500 text-white px-3 py-1 rounded-md text-xs">Tìm kiếm</button>
          <button className="bg-green-500 text-white px-3 py-1 rounded-md text-xs">Lấy mẫu</button>
          <div className="flex-grow"></div>
          <button className="bg-yellow-500 text-white px-3 py-1 rounded-md text-xs">Xuất Excel</button>
        </div>
      </div>
      <table className="w-full border-collapse text-xs">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-1 py-1 text-xs">STT</th>
            <th className="border whitespace-nowrap px-1 py-1 text-xs">Ngày nhập</th>
            <th className="border whitespace-nowrap px-1 py-1 text-xs">Người nhập</th>
            <th className="border px-1 whitespace-nowrap py-1 text-xs">Trạng thái</th>
            <th className="border px-1 whitespace-nowrap py-1 text-xs">Phụ liệu</th>
            <th className="border px-1 whitespace-nowrap py-1 text-xs">Số lô</th>
            <th className="border px-1 whitespace-nowrap py-1 text-xs">Số K</th>
            <th className="border px-1 whitespace-nowrap py-1 text-xs">Khối lượng</th>
            <th className="border px-1 whitespace-nowrap py-1 text-xs">Quy cách</th>
            <th className="border px-1 whitespace-nowrap py-1 text-xs">NSX</th>
            <th className="border px-1 whitespace-nowrap py-1 text-xs">HĐ</th>
            <th className="border px-1 whitespace-nowrap py-1 text-xs">Nhà SX</th>
            <th className="border px-1 whitespace-nowrap py-1 text-xs">Nhà CC</th>
          </tr>
        </thead>
        <tbody>
          {fakeData.map((item) => (
            <tr key={item.id}>
              <td className="border px-1 py-1 text-xs  whitespace-nowrap">{item.id}</td>
              <td className="border px-1 py-1 text-xs whitespace-nowrap">{item.date}</td>
              <td className="border px-1 py-1 text-xs whitespace-nowrap">{item.user}</td>
              <td className={`border px-1 py-1 text-xs whitespace-nowrap ${item.status === 'Chưa lấy mẫu' ? 'text-orange-600' : 'text-green-600'}`}>
                {item.status}
              </td>
              <td className="border px-1 py-1 text-xs whitespace-nowrap truncate max-w-xs">{item.material}</td>
              <td className="border px-1 py-1 text-xs whitespace-nowrap">{item.lotNumber}</td>
              <td className="border px-1 py-1 text-xs whitespace-nowrap">{item.kNumber}</td>
              <td className="border px-1 py-1 text-xs whitespace-nowrap">{item.weight}</td>
              <td className="border px-1 py-1 text-xs whitespace-nowrap">{item.packaging}</td>
              <td className="border px-1 py-1 text-xs whitespace-nowrap">{item.productionDate}</td>
              <td className="border px-1 py-1 text-xs whitespace-nowrap">{item.expiryDate}</td>
              <td className="border px-1 py-1 text-xs whitespace-nowrap truncate max-w-xs">{item.manufacturer}</td>
              <td className="border px-1 py-1 text-xs whitespace-nowrap truncate max-w-xs">{item.supplier}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SamplingComponent;
