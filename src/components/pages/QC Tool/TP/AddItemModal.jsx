import React from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

Modal.setAppElement('#root');

// Define schema for validation
const schema = yup.object({
  dateIn: yup.string().required('Ngày nhập là bắt buộc'),
  enteredBy: yup.string().required('Người nhập là bắt buộc'),
  status: yup.string().required('Trạng thái là bắt buộc'),
  material: yup.string().required('Phụ liệu là bắt buộc'),
  batch: yup.string().required('Số lô là bắt buộc'),
  serialNumber: yup.string().required('Số K là bắt buộc'),
  weight: yup.number().required('Khối lượng là bắt buộc').positive('Khối lượng phải lớn hơn 0'),
  specification: yup.string().required('Quy cách là bắt buộc'),
  productionDate: yup.string().required('Ngày sản xuất là bắt buộc'),
  expiryDate: yup.string().required('Hạn dùng là bắt buộc'),
  manufacturer: yup.string().required('Nhà sản xuất là bắt buộc'),
  supplier: yup.string().required('Nhà cung cấp là bắt buộc'),
}).required();

const AddItemModal = ({ isOpen, onClose, onSave }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    onSave(data);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add New Item"
      className=" max-w-6xl mx-auto mt-20 p-6 bg-white relative z-50"
      overlayClassName="overlay fixed inset-0 bg-black bg-opacity-50 z-40"
      style={{
        content: {
          maxHeight: '80vh', // Giới hạn chiều cao tối đa của modal
          overflowY: 'auto',  // Thêm cuộn nếu nội dung vượt quá chiều cao
          width: '90%',       // Đặt modal chiếm 90% chiều rộng khung nhìn
        }
      }}
    >
      {/* Modal Title */}
      <h2 className="text-2xl font-bold mb-6 text-left text-gray-800">
        Lấy mẫu thành phẩm
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Field 1 */}
        <div>
          <label className="block text-gray-600 text-sm text-left mb-2">Ngày nhập</label>
          <input
            type="date"
            {...register('dateIn')}
            className={`border w-full p-2 rounded-md focus:outline-none focus:ring-2 ${errors.dateIn ? 'border-red-500' : 'focus:ring-blue-400'}`}
          />
          {errors.dateIn && <p className="text-red-500 text-sm">{errors.dateIn.message}</p>}
        </div>

        {/* Field 2 */}
        <div>
          <label className="block text-gray-600 text-sm text-left mb-2 ml-4">Người nhập</label>
          <input
            type="text"
            {...register('enteredBy')}
            className={`border w-full p-2 rounded-md focus:outline-none focus:ring-2 ${errors.enteredBy ? 'border-red-500' : 'focus:ring-blue-400'}`}
          />
          {errors.enteredBy && <p className="text-red-500 text-sm">{errors.enteredBy.message}</p>}
        </div>

        {/* Field 3 */}
        <div>
          <label className="block text-gray-600 text-sm text-left mb-2">Trạng thái</label>
          <input
            type="text"
            {...register('status')}
            className={`border w-full p-2 rounded-md focus:outline-none focus:ring-2 ${errors.status ? 'border-red-500' : 'focus:ring-blue-400'}`}
          />
          {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
        </div>

        {/* Field 4 */}
        <div>
          <label className="block text-gray-600 text-sm text-left mb-2">Phụ liệu</label>
          <input
            type="text"
            {...register('material')}
            className={`border w-full p-2 rounded-md focus:outline-none focus:ring-2 ${errors.material ? 'border-red-500' : 'focus:ring-blue-400'}`}
          />
          {errors.material && <p className="text-red-500 text-sm">{errors.material.message}</p>}
        </div>

        {/* Field 5 */}
        <div>
          <label className="block text-gray-600 text-sm text-left mb-2">Số lô</label>
          <input
            type="text"
            {...register('batch')}
            className={`border w-full p-2 rounded-md focus:outline-none focus:ring-2 ${errors.batch ? 'border-red-500' : 'focus:ring-blue-400'}`}
          />
          {errors.batch && <p className="text-red-500 text-sm">{errors.batch.message}</p>}
        </div>

        {/* Field 6 */}
        <div>
          <label className="block text-gray-600 text-sm text-left mb-2">Số K</label>
          <input
            type="text"
            {...register('serialNumber')}
            className={`border w-full p-2 rounded-md focus:outline-none focus:ring-2 ${errors.serialNumber ? 'border-red-500' : 'focus:ring-blue-400'}`}
          />
          {errors.serialNumber && <p className="text-red-500 text-sm">{errors.serialNumber.message}</p>}
        </div>

        {/* Field 7 */}
        <div>
          <label className="block text-gray-600 text-sm text-left mb-2">Khối lượng</label>
          <input
            type="number"
            {...register('weight')}
            className={`border w-full p-2 rounded-md focus:outline-none focus:ring-2 ${errors.weight ? 'border-red-500' : 'focus:ring-blue-400'}`}
          />
          {errors.weight && <p className="text-red-500 text-sm">{errors.weight.message}</p>}
        </div>

        {/* Field 8 */}
        <div>
          <label className="block text-gray-600 text-sm text-left mb-2">Quy cách</label>
          <input
            type="text"
            {...register('specification')}
            className={`border w-full p-2 rounded-md focus:outline-none focus:ring-2 ${errors.specification ? 'border-red-500' : 'focus:ring-blue-400'}`}
          />
          {errors.specification && <p className="text-red-500 text-sm">{errors.specification.message}</p>}
        </div>

        {/* Field 9 */}
        <div>
          <label className="block text-gray-600 text-sm text-left mb-2">Ngày sản xuất</label>
          <input
            type="date"
            {...register('productionDate')}
            className={`border w-full p-2 rounded-md focus:outline-none focus:ring-2 ${errors.productionDate ? 'border-red-500' : 'focus:ring-blue-400'}`}
          />
          {errors.productionDate && <p className="text-red-500 text-sm">{errors.productionDate.message}</p>}
        </div>

        {/* Field 10 */}
        <div>
          <label className="block text-gray-600 text-sm text-left mb-2">Hạn dùng</label>
          <input
            type="date"
            {...register('expiryDate')}
            className={`border w-full p-2 rounded-md focus:outline-none focus:ring-2 ${errors.expiryDate ? 'border-red-500' : 'focus:ring-blue-400'}`}
          />
          {errors.expiryDate && <p className="text-red-500 text-sm">{errors.expiryDate.message}</p>}
        </div>

        {/* Field 11 */}
        <div>
          <label className="block text-gray-600 text-sm text-left mb-2">Nhà sản xuất</label>
          <input
            type="text"
            {...register('manufacturer')}
            className={`border w-full p-2 rounded-md focus:outline-none focus:ring-2 ${errors.manufacturer ? 'border-red-500' : 'focus:ring-blue-400'}`}
          />
          {errors.manufacturer && <p className="text-red-500 text-sm">{errors.manufacturer.message}</p>}
        </div>

        {/* Field 12 */}
        <div>
          <label className="block text-gray-600 text-sm text-left mb-2">Nhà cung cấp</label>
          <input
            type="text"
            {...register('supplier')}
            className={`border w-full p-2 rounded-md focus:outline-none focus:ring-2 ${errors.supplier ? 'border-red-500' : 'focus:ring-blue-400'}`}
          />
          {errors.supplier && <p className="text-red-500 text-sm">{errors.supplier.message}</p>}
        </div>

        {/* Actions */}
        <div className="col-span-full flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddItemModal;
