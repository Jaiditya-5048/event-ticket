import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import { loginApi } from '../../apis/services/auth_api';
import { jwtDecode } from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AxiosError } from 'axios';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .max(64, 'Password can be at most 64 characters')
    .required('Password is required'),
});

interface LoginFormValues {
  email: string;
  password: string;
}

function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const { loginContext } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const response = await loginApi(values);
      console.log('✅ Login Successful:', response);
      loginContext(response.token);

      const from =
        (location.state as { from?: Location })?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ error: string }>;

      console.log('Full error:', axiosError);
      console.error(
        '❌ Login Failed:',
        axiosError.response?.data?.error || axiosError.message
      );
      alert(axiosError.response?.data?.error || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-5 h-[30%] bg-purple-600 text-2xl text-white p-4 text-center">
        <p>Discover Amazing Events</p>
        <p>
          Browse through our collection of exciting events happening around you
        </p>
      </div>
      <div className="mt-6">
        <p className="text-center text-4xl my-4 text-purple-700">Login</p>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form
              noValidate
              className="flex flex-col p-5 justify-center items-center gap-5 mx-auto border-1 bg-pink-100 border-purple-600 max-w-[25%] shadow-2xl rounded-2xl"
            >
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  name="email"
                  autoComplete="current-email"
                  id="email"
                  className="p-2 bg-purple-200 rounded-lg w-full"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-600"
                />
              </div>

              <div className="flex flex-col gap-2 w-full relative">
                <label htmlFor="password">Password</label>
                <Field
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  className="p-2 bg-purple-200 rounded-lg w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[38px] text-gray-700 cursor-pointer"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-600"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-900 transition-colors cursor-pointer w-full"
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
              <div className="flex gap-4">
                <p>Don&apos;t have an account?</p>
                <Link to="/signup">
                  <p className="hover:text-blue-800 underline">Register</p>
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default Login;
