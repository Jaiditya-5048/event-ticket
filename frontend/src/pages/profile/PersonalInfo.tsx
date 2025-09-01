import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { getUser, updateUser } from '../../apis/services/user_api';
import { toast } from 'react-toastify';

const PersonelInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [initialValues, setInitialValues] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(true);

  // Validation schema for form fields
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    phone: Yup.string()
      .matches(/^\d{10}$/, 'Phone must be 10 digits')
      .required('Phone is required'),
  });

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser();
        setInitialValues({
          name: user.name || '',
          email: user.email,
          phone: user.phone || '',
        });
      } catch (err) {
        console.error('Error fetching user:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);


// function to handle form submission
  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const payload = {
        name: values.name,
        phone: values.phone,
      };
      await updateUser(payload);
      setInitialValues(values);
      setIsEditing(false);
      toast.success('User information updated successfully!');
    } catch (err) {
      toast.error('Failed to update user information. Please try again.');
      console.error('Error updating user:', err);
    }
  };

  // Render loading state
  if (loading) {
    return <div className="text-center py-20 text-gray-500">Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">User Profile</h2>

      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, resetForm }) => {
          const displayName = values.name.trim() || values.email.split('@')[0];

          return (
            <Form>
              {/* Name */}
              <div className="mb-4">
                <label className="block font-medium mb-1">Name</label>
                <Field
                  name="name"
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none ${
                    isEditing
                      ? 'border-gray-300 focus:ring-2 focus:ring-blue-400'
                      : 'bg-gray-100 text-gray-700 border-gray-200'
                  }`}
                  placeholder="Enter your name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
                {!isEditing && values.name === '' && (
                  <div className="text-sm text-gray-500 mt-1">
                    (Showing username from email: <strong>{displayName}</strong>
                    )
                  </div>
                )}
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={values.email}
                  disabled
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-200 text-gray-700 cursor-not-allowed"
                />
              </div>

              {/* Phone */}
              <div className="mb-4">
                <label className="block font-medium mb-1">Phone</label>
                <Field
                  name="phone"
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none ${
                    isEditing
                      ? 'border-gray-300 focus:ring-2 focus:ring-blue-400'
                      : 'bg-gray-100 text-gray-700 border-gray-200'
                  }`}
                  placeholder="Enter your phone"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Buttons */}
              <div className="mt-6 flex justify-end gap-3">
                {isEditing ? (
                  <>
                    <button
                      type="button"
                      className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
                      onClick={() => {
                        resetForm();
                        setIsEditing(false);
                      }}
                    >
                      <FontAwesomeIcon icon={faTimes} className="mr-2" />
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <FontAwesomeIcon icon={faCheck} className="mr-2" />
                      Confirm
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    className="w-full px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={() => setIsEditing(true)}
                  >
                    <FontAwesomeIcon icon={faPen} className="mr-2" />
                    Edit
                  </button>
                )}
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default PersonelInfo;
