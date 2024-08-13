import React from 'react';

const MaterialSamplingComponent = () => {
  const sampleData = [
    {
      id: 1,
      entryDate: '12/08/24',
      enteredBy: 'Nguyễn Ngọc Huyền',
      status: 'Pending Sample',
      materialType: 'Cjel Bone Film 15g',
      lotNumber: 'M2',
      kNumber: 'BB23-362',
      weight: '213200 (G)',
      packaging: '1 (Box)',
      productionDate: '12/08/24',
      expiryDate: '12/08/25',
      manufacturer: 'Dong A Trading and Manufacturing Co., Ltd',
      supplier: 'Guangzhou Yuanyuan Packaging Co., Ltd'
    },
    {
      id: 2,
      entryDate: '10/08/24',
      enteredBy: 'Hoàng Thị Lan',
      status: 'Sampled',
      materialType: 'Plastic Bottle (Zentokid Shampoo 250ml)',
      lotNumber: 'KL',
      kNumber: 'BB23-362',
      weight: '22025 (Units)',
      packaging: '11 (Box)',
      productionDate: '10/08/24',
      expiryDate: '10/08/25',
      manufacturer: 'GUANGZHOU YUANYUAN PACKAGING CO., LTD',
      supplier: 'Guangzhou Yuanyuan Packaging Co., Ltd'
    },
    {
      id: 3,
      entryDate: '10/08/24',
      enteredBy: 'Hoàng Thị Lan',
      status: 'Sampled',
      materialType: 'Plastic Pump (Zentokid Shampoo Pump 250ml)',
      lotNumber: 'KL',
      kNumber: 'BB23-362',
      weight: '20161 (Units)',
      packaging: '3 (Box)',
      productionDate: '10/08/24',
      expiryDate: '10/08/25',
      manufacturer: 'GUANGZHOU YUANYUAN PACKAGING CO., LTD',
      supplier: 'Guangzhou Yuanyuan Packaging Co., Ltd'
    }
  ];

  return (
    <div className="p-2 bg-white shadow-md rounded-md">
      <div className="sticky top-0 bg-white z-10 p-2">
        <div className="flex items-center gap-2 mb-2">
          <input
            type="text"
            placeholder="K Number | Product Name"
            className="border p-1 rounded-md text-xs px-2"
          />
          <button className="bg-blue-500 text-white px-3 py-1 rounded-md text-xs">Search</button>
          <button className="bg-green-500 text-white px-3 py-1 rounded-md text-xs">Sample</button>
          <div className="flex-grow"></div>
          <button className="bg-yellow-500 text-white px-3 py-1 rounded-md text-xs">Export to Excel</button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-1 py-1 text-xs">No</th>
              <th className="border whitespace-nowrap px-1 py-1 text-xs">Entry Date</th>
              <th className="border whitespace-nowrap px-1 py-1 text-xs">Entered By</th>
              <th className="border px-1 whitespace-nowrap py-1 text-xs">Status</th>
              <th className="border px-1 whitespace-nowrap py-1 text-xs">Material Type</th>
              <th className="border px-1 whitespace-nowrap py-1 text-xs">Lot Number</th>
              <th className="border px-1 whitespace-nowrap py-1 text-xs">K Number</th>
              <th className="border px-1 whitespace-nowrap py-1 text-xs">Weight</th>
              <th className="border px-1 whitespace-nowrap py-1 text-xs">Packaging</th>
              <th className="border px-1 whitespace-nowrap py-1 text-xs">Production Date</th>
              <th className="border px-1 whitespace-nowrap py-1 text-xs">Expiry Date</th>
              <th className="border px-1 whitespace-nowrap py-1 text-xs">Manufacturer</th>
              <th className="border px-1 whitespace-nowrap py-1 text-xs">Supplier</th>
            </tr>
          </thead>
          <tbody>
            {sampleData.map((item) => (
              <tr key={item.id}>
                <td className="border px-1 py-1 text-xs whitespace-nowrap">{item.id}</td>
                <td className="border px-1 py-1 text-xs whitespace-nowrap">{item.entryDate}</td>
                <td className="border px-1 py-1 text-xs whitespace-nowrap">{item.enteredBy}</td>
                <td className={`border px-1 py-1 text-xs whitespace-nowrap ${item.status === 'Pending Sample' ? 'text-orange-600' : 'text-green-600'}`}>
                  {item.status}
                </td>
                <td className="border px-1 py-1 text-xs whitespace-nowrap truncate max-w-xs">{item.materialType}</td>
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
    </div>
  );
};

export default MaterialSamplingComponent;
