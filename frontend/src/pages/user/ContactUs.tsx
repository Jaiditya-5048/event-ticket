import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import React from 'react';

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),

  email: Yup.string().email('Invalid email').required('Email is required'),

  subject: Yup.string()
    .min(3, 'Subject must be at least 3 characters')
    .required('Subject is required'),

  message: Yup.string()
    .min(10, 'Message must be at least 10 characters')
    .required('Message is required'),
});

function ContactUs() {
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log('Form Submitted:', values);
    // API call goes here
    setSubmitting(false);
    resetForm();
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-5 h-[30%] bg-purple-600 text-2xl text-white p-4 text-center">
        <p>Discover Amazing Events</p>
        <p>
          Browse through our collection of exciting events happening around you
        </p>
      </div>
      <div className="bg-pink-100  flex w-[70%] mx-auto mt-5 rounded-2xl shadow-lg border-1 border-purple-500">
        <div className="flex flex-col items-center justify-center gap-5 p-4 w-2/5">
          <p>Get In Touch</p>
          <div>
            <div>
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <div>
              <p>Email</p>
              <p>support@eventspot.com</p>
              <p>info@eventspot.com</p>
            </div>
          </div>
          <div>
            <div>
              <FontAwesomeIcon icon={faPhone} />{' '}
            </div>
            <div>
              <p>Phone</p>
              <p>+1 (555) 123-4567</p>
              <p>Mon-Fri, 9am-6pm EST</p>
            </div>
          </div>
          <div>
            <div>
              <FontAwesomeIcon icon={faLocationDot} />{' '}
            </div>
            <div>
              <p>Office</p>
              <p>123 Event Avenue</p>
              <p>Suite 400</p>
              <p>New York, NY 10001</p>
            </div>
          </div>
          <p>Follow Us</p>
          <div className="flex gap-3 text-2xl">
            <FontAwesomeIcon icon={faTwitter} />
            <FontAwesomeIcon icon={faFacebookF} />
            <FontAwesomeIcon icon={faInstagram} />
          </div>
        </div>
        <div className="w-3/5 p-5 flex flex-col gap-3">
          <p className="text-2xl max-w-[90%] mx-auto ">Send Us a Message</p>

          <div className="flex flex-col items-center justify-center p-4 ">
            <Formik
              initialValues={{ name: '', email: '', subject: '', message: '' }}
              validationSchema={ContactSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form noValidate className="flex flex-col gap-4">
                  <div className="flex gap-4">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name">Name</label>

                      <Field
                        type="text"
                        name="name"
                        id="name"
                        placeholder="John Doe"
                        className="bg-purple-200 p-2 rounded-lg "
                      />
                      <ErrorMessage
                        name="name"
                        component="p"
                        className="text-red-600"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="email">Email</label>
                      <Field
                        type="email"
                        name="email"
                        id="email"
                        className="bg-purple-200 p-2 rounded-lg"
                      />
                      <ErrorMessage
                        name="email"
                        component="p"
                        className="text-red-600"
                      />
                    </div>
                  </div>{' '}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="subject">Subject</label>

                    <Field
                      type="text"
                      name="subject"
                      id="subject"
                      className="bg-purple-200 p-2 rounded-lg"
                    />
                    <ErrorMessage
                      name="subject"
                      component="p"
                      className="text-red-600"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message">Message</label>

                    <Field
                      as="textarea"
                      name="message"
                      id="message"
                      rows={4}
                      className="bg-purple-200 p-2 rounded-lg"
                    />
                    <ErrorMessage
                      name="message"
                      component="p"
                      className="text-red-600"
                    />
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600"
                    >
                      Send Message
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
