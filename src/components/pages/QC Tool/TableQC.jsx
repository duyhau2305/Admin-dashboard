import React, { useState, useEffect } from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function TableQC({ qcData }) {
  const [tableHeight, setTableHeight] = useState('auto');

  useEffect(() => {
    const numRows = qcData.length;
    const maxRowsToShow = 10;
    const rowHeight = 40;

    if (numRows > maxRowsToShow) {
      setTableHeight(`${maxRowsToShow * rowHeight}px`);
    } else {
      setTableHeight('auto');
    }
  }, [qcData]);

  const cellStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };

  const headerCellStyle = {
    ...cellStyle,
    fontWeight: 'bold',
    backgroundColor: '#f3f3f3',
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(qcData);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'});
    FileSaver.saveAs(data, 'qcData.xlsx');
  };

  const exportToPDF = () => {
    const input = document.getElementById('table-to-export-qc');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({ orientation: 'landscape' });
        const imgWidth = 210;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('qcData.pdf');
      });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2 py-2">QC Data</h2>
      <div className="flex justify-end mb-2">
        <div>
          <button className="bg-emerald-400 text-white py-2 px-4 rounded-lg hover:bg-blue-600 mt-4" onClick={exportToExcel}>Export to Excel</button>
          <button className="bg-emerald-400 text-white py-2 px-4 rounded-lg hover:bg-blue-600 mt-4" onClick={exportToPDF} style={{ marginLeft: '10px' }}>Export to PDF</button>
        </div>
      </div>
      <div style={{ maxHeight: tableHeight, overflowY: 'auto' }}>
        <table className="w-full" style={{ tableLayout: 'fixed' }} id="table-to-export-qc">
          <thead>
            <tr>
              <th style={{ ...headerCellStyle, width: '12%' }}>Mã K Kiểm Định</th>
              <th style={{ ...headerCellStyle, width: '8%' }}>Batch</th>
              <th style={{ ...headerCellStyle, width: '12%' }}>Tên sản phẩm</th>
              <th style={{ ...headerCellStyle, width: '12%' }}>Loại sản phẩm</th>
              <th style={{ ...headerCellStyle, width: '12%' }}>Ca sản xuất</th>
              <th style={{ ...headerCellStyle, width: '15%' }}>Ngày sản xuất</th>
              <th style={{ ...headerCellStyle, width: '12%' }}>Nhân viên</th>
            </tr>
          </thead>
          <tbody>
            {qcData.map((data, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? 'bg-gray-100' : ''}
              >
                <td style={cellStyle}>{data.maKiemdinh}</td>
                <td style={cellStyle}>{data.batch}</td>
                <td style={cellStyle}>{data.tenSanPham}</td>
                <td style={cellStyle}>{data.loaiSanPham}</td>
                <td style={cellStyle}>{data.caSanXuat}</td>
                <td style={cellStyle}>{data.ngaySanXuat}</td>
                <td style={cellStyle}>{data.nhanvien}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableQC;
