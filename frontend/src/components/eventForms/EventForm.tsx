import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import FormikTextInput from '../ui/form-UI/input';
import FormikSelect from '@/components/ui/form-UI/DropDown'
import { Button } from '../ui/button';
import {
  createEvent,
  updateEvent,
} from '@/apis/services/organiser_apis/event_api';
import { Event } from '@/utils/types/event_types';
import { useEventForm } from '@/context/EventFormContext';

interface Category {
  id: string;
  name: string;
}

interface InitialValues {
  name: string;
  description: string;
  category_id: string;
}

type EventFormProps = {
  eventId?: string;
  editValues?: InitialValues;
  onSuccess?: (response: Event) => void;
};

const initialValues = {
  name: '',
  description: '',
  category_id: '',
};

// Validation schema
const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup
    .string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters long'),
  category_id: yup
    .number()
    .typeError('Category is required')
    .required('Category is required')
    .min(1, 'Category is required'),
});

function EventForm({ eventId, editValues, onSuccess }: EventFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const {setEvent} = useEventForm()

const submitHandler = async (
  values: InitialValues,
  { resetForm }: { resetForm: () => void }
) => {
  try {
    let response;

    if (editValues && eventId) {
      response = await updateEvent(eventId, values);
      console.log('Event updated', response);
    } else {
      response = await createEvent(values);
      console.log('Event Created', response);
      setEvent(response)
    }
    resetForm();

    // Trigger success callback
    onSuccess?.(response);
  } catch (err) {
    console.log(err);
  }
};


  useEffect(() => {
    const fetchCategories = async () => {
      // TODO: Replace API
      const data = [
        { id: '1', name: 'Music' },
        { id: '2', name: 'Technology' },
        { id: '3', name: 'Food' },
        { id: '4', name: 'Art' },
      ];
      setCategories(data);
    };
    fetchCategories();
  }, []);
  return (
    <Formik
      initialValues={editValues ? editValues : initialValues}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => submitHandler(values, { resetForm })}
    >
      {({ isSubmitting }) => (
        <Form className="">
          <FormikTextInput label="Event name" name="name" />
          <FormikTextInput label="Description" name="description" />
          <FormikSelect label="Event category" name="category_id">
            <option value="">select category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </FormikSelect>
          <Button type="submit" variant='default' disabled={isSubmitting} className="w-full">
            {editValues ? 'Update Event' : 'Create Event'}
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default EventForm;
