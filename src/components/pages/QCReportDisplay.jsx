import React, { useState } from 'react';

function QCReportDisplay({ data, savedReports }) {
  const [isReportSaved, setIsReportSaved] = useState(false);

  const handleSendEmail = () => {
    // Implement the code to send an email with the report data here.
    // You can use a library or service to send emails, such as Nodemailer for Node.js.
    // For the sake of brevity, the email sending code is not included here.
    // You should replace this comment with the actual email sending logic.
    alert('Email sending functionality should be implemented here.');
  };

  const handleSaveReport = () => {
    savedReports.push(data);
    setIsReportSaved(true);
    // Save updated savedReports to localStorage
    localStorage.setItem('savedReports', JSON.stringify(savedReports));
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">QC Report Details</h1>
      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-gray-200 border border-gray-400">Thông tin kiểm định</th>
              <th className="px-4 py-2 bg-gray-200 border-gray-400">Kết quả</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data).map(([key, value], index) => (
              <tr key={index}>
                <td className="px-4 py-2 border border-gray-400">{key}</td>
                <td className="px-4 py-2 border border-gray-400">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex space-x-4 mt-4">
        <button
          onClick={() => window.print()}
          className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
        >
          Print Report
        </button>
        <button
          onClick={handleSendEmail}
          className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-200"
        >
          Send Email
        </button>
        <button
          onClick={handleSaveReport}
          className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
        >
          Save Report
        </button>
      </div>
      {isReportSaved && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Saved Reports</h2>
          <ul>
            {savedReports.map((report, index) => (
              <li key={index}>
                <h3 className="text-md font-semibold mb-1">Report {index + 1}</h3>
                <div className="border border-gray-300 rounded-md p-2">
                  {Object.entries(report).map(([key, value], index) => (
                    <div key={index} className="mb-2">
                      <strong>{key}:</strong> {value}
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default QCReportDisplay;
