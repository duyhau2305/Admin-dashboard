import React from 'react';

function TableStandard({ standardData }) {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-3">List of Standards</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Standard Code
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Standard Name
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Specifics
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Issue Date
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Issuer
              </th>
            </tr>
          </thead>
          <tbody>
            {standardData.map((standard, index) => (
              <tr key={index}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {standard.standardCode}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {standard.standardName}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {standard.specifics}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {standard.issueDate}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {standard.issuer}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableStandard;
