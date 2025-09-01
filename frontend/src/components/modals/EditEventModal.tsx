// components/modals/EditEventModal.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { Event } from '@/utils/types/event_types';
import { useEventContext } from '@/context/EventContext';
import { updateEvent } from '@/apis/services/organiser_apis/event_api';


interface EditEventModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: Event;
}

const categories = [
  { id: '1', name: 'Music' },
  { id: '2', name: 'Technology' },
  { id: '3', name: 'Food' },
  { id: '4', name: 'Art' },
];

// --- Validation schema ---
const eventSchema = Yup.object().shape({
  name: Yup.string().required('Event name is required'),
  description: Yup.string()
    .required('Description is required')
    .min(10, 'Must be at least 10 characters'),
  category_id: Yup.string().required('Category is required'),
});

export default function EditEventModal({
  open,
  onOpenChange,
  event,
}: EditEventModalProps) {
  const [selectedCategory, setSelectedCategory] = useState(
    event?.Category?.category_id?.toString() || ''
  );
  const { refetch } = useEventContext();

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      console.log(values); // will now include category_id
      await updateEvent((event.event_id).toString(), values);
      refetch(); // trigger context re-fetch
      onOpenChange(false); // close modal
    } catch (error) {
      console.error('Failed to update event:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white" onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={{
            name: event?.name || '',
            description: event?.description || '',
            category_id: event?.Category?.category_id?.toString() || '',
          }}
          validationSchema={eventSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ errors, touched, isSubmitting, setFieldValue, values }) => (
            <Form className="space-y-4">
              {/* Event Name */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Event Name</Label>
                <Field as={Input} id="name" name="name" />
                {errors.name && touched.name && (
                  <p className="text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              {/* Description */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="description">Description</Label>
                <Field as={Input} id="description" name="description" />
                {errors.description && touched.description && (
                  <p className="text-sm text-red-500">{errors.description}</p>
                )}
              </div>

              {/* Category Dropdown */}
              <div className="flex flex-col gap-2">
                <Label>Category</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      type="button"
                      className="justify-between"
                    >
                      {values.category_id
                        ? categories.find((c) => c.id === values.category_id)
                            ?.name
                        : 'Select category'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-115 bg-white">
                    {categories.map((cat) => (
                      <DropdownMenuItem
                        key={cat.id}
                        className="hover:bg-gray-400"
                        onClick={() => {
                          setSelectedCategory(cat.id);
                          setFieldValue('category_id', cat.id);
                        }}
                      >
                        {cat.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                {errors.category_id && touched.category_id && (
                  <p className="text-sm text-red-500">{errors.category_id}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
