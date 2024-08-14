import React from 'react';

const ResultNguyenLieu = () => {
  const fakeData = [
    {
      id: 1,
      status: 'Đã nhận',
      kNumber : 'BB23-362',
      material: 'Màng Cjel Bone 15g',
      lotNumber: 'M2',
      productionDate: '12/08/24',
      expiryDate: '12/08/25',
      weight: '40/40 (GAM)',
      statusSample: 'Nguyên liệu mới',
      file: 'aa.pdf',
      resultDate:'12-08-2024',
      placesample: 'Kho nguyên liệu',
      user: 'Nguyễn Ngọc Huyền', 
      entryDate:'02-08-2024',
      action:''
     },
     
  ];

  return (
    <div className=" p-2 bg-white shadow-md rounded-md">
      <div className="sticky left-0 bg-white z-10 p-2">
        <div className="flex items-center gap-2 mb-2">
          <input
            type="text"
            placeholder="Số K | Tên sản phẩm"
            className="border p-1 rounded-md text-xs px-2"
          />
          <button className="bg-blue-500 text-white px-3 py-1 rounded-md text-xs">Tìm kiếm</button>
          <button className="bg-green-500 text-white px-3 py-1 rounded-md text-xs">Báo cáo</button>
          <div className="flex-grow"></div>
          <button className="bg-yellow-500 text-white px-3 py-1 rounded-md text-xs">Xuất Excel</button>
        </div>
      </div>
      <table className="w-full border-collapse text-xs">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-1 py-1 text-xs">STT</th>
            <th className="border whitespace-nowrap px-1 py-1 text-xs">Trạng thái</th>
            <th className="border whitespace-nowrap px-1 py-1 text-xs">Số K</th>
            <th className="border px-2 whitespace-nowrap py-1 text-xs">Nguyên liệu</th>
            <th className="border px-2 whitespace-nowrap py-1 text-xs">Số lô</th>
            <th className="border px-2 whitespace-nowrap py-1 text-xs">Ngày sản xuất</th>
            <th className="border px-2 whitespace-nowrap py-1 text-xs">Hạn dùng</th>
            <th className="border px-2 whitespace-nowrap py-1 text-xs">Lượng lấy</th>
            <th className="border px-2 whitespace-nowrap py-1 text-xs">Tình trạng mẫu</th>
            <th className="border px-2 whitespace-nowrap py-1 text-xs">file</th>
            <th className="border px-2 whitespace-nowrap py-1 text-xs">Ngày trả KQ</th>
            <th className="border px-2 whitespace-nowrap py-1 text-xs">Nơi lấy mẫu</th>
            <th className="border px-2 whitespace-nowrap py-1 text-xs">Người lấy</th>
            <th className="border px-2 whitespace-nowrap py-1 text-xs">Ngày lấy</th>
            <th className="border px-2 whitespace-nowrap py-1 text-xs">Action</th>
          </tr>
        </thead>
        <tbody>
          {fakeData.map((item) => (
            <tr key={item.id}>
              <td className="border px-1 py-1 text-xs  whitespace-nowrap">{item.id}</td>
              <td className={`border px-1 py-1 text-xs whitespace-nowrap ${item.status === 'Chưa lấy mẫu' ? 'text-orange-600' : 'text-green-600'}`}>
                {item.status}
              </td>
              <td className="border px-1 py-1 text-xs whitespace-nowrap">{item.kNumber}</td>
              <td className="border px-1 py-1 text-xs whitespace-nowrap truncate max-w-xs">{item.material}</td>
              <td className="border px-1 py-1 text-xs whitespace-nowrap">{item.lotNumber}</td>
              <td className="border px-1 py-1 text-xs whitespace-nowrap">{item.productionDate}</td>
              
              <td className="border px-1 py-1 text-xs whitespace-nowrap">{item.expiryDate}</td>
              <td className="border px-1 py-1 text-xs whitespace-nowrap">{item.weight}</td>
              <td className="border px-1 py-1 text-xs whitespace-nowrap">{item.statusSample}</td>
              <td className="border px-1 py-1 text-xs whitespace-nowrap">{item.file}</td>
              <td className="border px-1 py-1 text-xs whitespace-nowrap">{item.resultDate}</td>
              <td className="border px-1 py-1 text-xs whitespace-nowrap">{item.placesample}</td>
              <td className="border px-1 py-1 text-xs whitespace-nowrap">{item.user}</td>
              <td className="border px-1 py-1 text-xs whitespace-nowrap">{item.entryDate}</td>
              <td className="border px-1 py-1 text-xs whitespace-nowrap">{item.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultNguyenLieu;
