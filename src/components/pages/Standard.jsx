import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';
import TableStandard from './TableStandard';// Replace with your table component for standards

function StandardPage() {
  const { handleSubmit, control, reset } = useForm();
  const [standardData, setStandardData] = useState([]);

  // Load data from localStorage when the component mounts
  useEffect(() => {
    const savedStandardData = localStorage.getItem('standardData');
    if (savedStandardData) {
      setStandardData(JSON.parse(savedStandardData));
    }
  }, []);

  // Save data to localStorage when standardData changes
  useEffect(() => {
    localStorage.setItem('standardData', JSON.stringify(standardData));
  }, [standardData]);

  const onSubmit = (data) => {
    setStandardData([...standardData, data]);
    reset(); // Reset the form after submission
  };

  return (
    <div className="bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Standards Page</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white p-4 shadow-md rounded-md">
          <div className="grid grid-cols-4 gap-4">
            {/* Standard Code Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Standard Code</label>
              <Controller
                name="standardCode"
                control={control}
                defaultValue=""
                render={({ field }) => <input {...field} className="border rounded-md p-2 w-full" />}
              />
            </div>

            {/* Standard Name Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Standard Name</label>
              <Controller
                name="standardName"
                control={control}
                defaultValue=""
                render={({ field }) => <input {...field} className="border rounded-md p-2 w-full" />}
              />
            </div>

            {/* Specifics Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Specifics</label>
              <Controller
                name="specifics"
                control={control}
                defaultValue=""
                render={({ field }) => <input {...field} className="border rounded-md p-2 w-full" />}
              />
            </div>

            {/* Issue Date Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Issue Date</label>
              <Controller
                name="issueDate"
                control={control}
                defaultValue=""
                render={({ field }) => <input {...field} type="date" className="border rounded-md p-2 w-full" />}
              />
            </div>

            {/* Issuer Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Issuer</label>
              <Controller
                name="issuer"
                control={control}
                defaultValue=""
                render={({ field }) => <input {...field} className="border rounded-md p-2 w-full" />}
              />
            </div>
          </div>
        </div>
        <button type="submit" className="bg-emerald-400 text-white px-4 py-2 mt-4 rounded-md">
          Add Standard
        </button>
      </form>
      <TableStandard standardData={standardData} />
      
    </div>
  );
}

export default StandardPage;
