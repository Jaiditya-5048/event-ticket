import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { signUpApi } from '../../apis/services/auth_api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

function SignUp() {
  const [apiError, setApiError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, 'Phone must be 10 digits')
        .required('Phone is required'),
      password: Yup.string()
        .min(6, 'Minimum 6 characters')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required'),
    }),
    onSubmit: async (
      values,
      {
        setSubmitting,
        resetForm,
      }: {
        setSubmitting: (isSubmitting: boolean) => void;
        resetForm: () => void;
      }
    ) => {
      setApiError(null);
      setSuccess(false);

      try {
        const { confirmPassword, ...submitValues } = values;
        const res = await signUpApi(submitValues);
        console.log('✅ Signup Successful:', res);

        setSuccess(true);
        resetForm();
        navigate('/login');
      } catch (err: unknown) {
        const axiosError = err as AxiosError<{ error: string }>;
        setApiError(axiosError.response?.data?.error || axiosError.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-5 h-[30%] bg-purple-600 text-2xl text-white p-4 text-center">
        <p>Discover Amazing Events</p>
        <p>
          Browse through our collection of exciting events happening around you
        </p>
      </div>

      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-2xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

        {apiError && (
          <p className="text-red-600 mb-4 text-center">{apiError}</p>
        )}
        {success && (
          <p className="text-green-600 mb-4 text-center">Signup successful!</p>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block font-medium">
              Name
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              {...formik.getFieldProps('name')}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-600 text-sm">{formik.errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              {...formik.getFieldProps('email')}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-600 text-sm">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label htmlFor="password" className="block font-medium">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              {...formik.getFieldProps('password')}
              className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-9 text-gray-600 text-sm"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label htmlFor="confirmPassword" className="block font-medium">
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              type={showConfirm ? 'text' : 'password'}
              autoComplete="new-password"
              {...formik.getFieldProps('confirmPassword')}
              className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-2 top-9 text-gray-600 text-sm"
            >
              <FontAwesomeIcon icon={showConfirm ? faEyeSlash : faEye} />
            </button>
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block font-medium">
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              {...formik.getFieldProps('phone')}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-600 text-sm">{formik.errors.phone}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded"
          >
            {formik.isSubmitting ? 'Submitting...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </>
  );
}

export default SignUp;
