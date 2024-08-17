import * as XLSX from 'xlsx';

const ExportExcelButton = ({ data }) => {
  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sampling Data');
    XLSX.writeFile(workbook, 'SamplingData.xlsx');
    alert('Xuất dữ liệu thành công!');
  };

  return (
    <div className="flex justify-end">
      <button
        className="bg-yellow-500 text-white px-3 py-1 rounded-md text-xs"
        onClick={handleExportExcel}
      >
        Xuất Excel
      </button>
    </div>
  );
};

export default ExportExcelButton;
