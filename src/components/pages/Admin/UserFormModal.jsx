import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const UserFormModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = yup.object().shape({
    employeeId: yup.string().required('Mã nhân viên là bắt buộc'),
    username: yup.string().required('Tên đăng nhập là bắt buộc'),
    name: yup.string().required('Tên là bắt buộc'),
    email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
    password: yup.string()
      .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
      .required('Mật khẩu là bắt buộc'),
    role: yup.string().required('Vai trò là bắt buộc'),
  });

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (initialData) {
      setValue('employeeId', initialData.employeeId);
      setValue('username', initialData.username);
      setValue('name', initialData.name);
      setValue('email', initialData.email);
      setValue('password', initialData.password);
      setValue('role', initialData.role);
    } else {
      reset(); // Reset form when there's no initial data
    }
  }, [initialData, reset, setValue]);

  const onSubmit = (data) => {
    onSave(data);
    reset(); // Reset form after saving
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-md w-1/2">
          <h2 className="text-2xl font-bold mb-4">{initialData ? 'Chỉnh sửa người dùng' : 'Tạo người dùng mới'}</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Mã Nhân Viên</label>
                <input
                  type="text"
                  className={`border p-2 w-full ${errors.employeeId ? 'border-red-500' : ''}`}
                  {...register('employeeId')}
                />
                {errors.employeeId && <p className="text-red-500 text-sm">{errors.employeeId.message}</p>}
              </div>
              <div>
                <label className="block mb-2">Tên đăng nhập</label>
                <input
                  type="text"
                  className={`border p-2 w-full ${errors.username ? 'border-red-500' : ''}`}
                  {...register('username')}
                />
                {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
              </div>
              <div>
                <label className="block mb-2">Tên</label>
                <input
                  type="text"
                  className={`border p-2 w-full ${errors.name ? 'border-red-500' : ''}`}
                  {...register('name')}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>
              <div>
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  className={`border p-2 w-full ${errors.email ? 'border-red-500' : ''}`}
                  {...register('email')}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>
              <div className="relative">
                <label className="block mb-2">Mật khẩu</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={`border p-2 w-full ${errors.password ? 'border-red-500' : ''}`}
                  {...register('password')}
                />
                <div className="absolute top-10 right-2 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? 'Ẩn' : 'Hiển thị'}
                </div>
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>
              <div>
                <label className="block mb-2">Vai trò</label>
                <select
                  className={`border p-2 w-full ${errors.role ? 'border-red-500' : ''}`}
                  {...register('role')}
                >
                  <option value="">Chọn vai trò</option>
                  <option value="Production">Production</option>
                  <option value="QA">QA</option>
                  <option value="QC">QC</option>
                </select>
                {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button type="button" className="bg-gray-400 text-white py-2 px-4 rounded-md mr-2" onClick={onClose}>
                Hủy
              </button>
              <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md">
                {initialData ? 'Cập nhật' : 'Lưu'}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default UserFormModal;
