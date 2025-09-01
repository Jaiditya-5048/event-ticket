// EventInstanceForm.tsx
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { FaTrashAlt } from 'react-icons/fa';
import { useEventForm } from '@/context/EventFormContext';
import AddVenueModal from '@/components/modals/AddVenueModal';
import AddArtistModal from '@/components/modals/AddArtistModal';
import { Button } from '../ui/button';
import {
  createInstance,
  deleteInstance,
  updateInstance,
} from '@/apis/services/organiser_apis/instance_api';
import { formatDate, formatTime, toISOStringUTC } from '@/utils/formatDateTime';
import { EventInstance } from '@/utils/types/event_types';

interface Ticket {
  name: string;
  price: number | string;
  total_seats: number | string;
}

export interface FormValues {
  date: string;
  time: string;
  venue_id: string;
  artist_ids: string[];
  tickets: Ticket[];
  editingInstanceId?: number | null;
}

interface Props {
  onSubmitHandler?: (data: any) => void;
}

export interface EventInstanceFormRef {
  resetFormState: () => void;
  loadInstanceForEdit: (instance: any) => void;
}

const validationSchema = Yup.object().shape({
  date: Yup.string().required('Date is required'),
  time: Yup.string().required('Time is required'),
  venue_id: Yup.string().required('Venue is required'),
  artist_ids: Yup.array()
    .of(Yup.string().required('Artist is required'))
    .min(1, 'At least one artist is required'), 
  tickets: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required('Ticket name is required'),
        price: Yup.number().positive('Price must be positive').required(),
        total_seats: Yup.number().min(1, 'Minimum 1 seat required').required(),
      })
    )
    .min(1, 'At least one ticket type is required'),
});

const EventInstanceForm = forwardRef<EventInstanceFormRef, Props>(
  ({ onSubmitHandler }, ref) => {

  const { venuesList, artistsList, event } = useEventForm();
  const [instances, setInstances] = useState<EventInstance[]>([]);
  const [venueModalOpen, setVenueModalOpen] = useState(false);
  const [artistModalOpen, setArtistModalOpen] = useState(false);
  const [editInstance, setEditInstance] = useState<EventInstance | null>(null);

  const initialValues: FormValues = {
    date: '',
    time: '',
    venue_id: '',
    artist_ids: [],
    tickets: [{ name: '', price: '', total_seats: '' }],
    editingInstanceId: null,
  };

  /**
   * Handles both creating and editing an instance.
   * If `editingInstanceId` is present, it updates the instance.
   * Otherwise, it creates a new instance.
   */
  const handleFormSubmit = async (values: FormValues, { resetForm }: any) => {
    const date_time = toISOStringUTC(values.date, values.time);

    const payload = {
      event_id: event.event_id,
      venue_id: Number(values.venue_id),
      artist_ids: values.artist_ids,
      date_time,
      capacity: 1000,
      tickets: values.tickets,
    };

    try {
      if (values.editingInstanceId) {
        // Update existing instance
        const updated = await updateInstance(values.editingInstanceId, payload);
        setInstances((prev) =>
          prev.map((inst) =>
            inst.instance_id === values.editingInstanceId ? updated : inst
          )
        );
        setEditInstance(null);
      } else {
        // Create new instance
        const created = await createInstance(payload);
        console.log(created);
        
        setInstances((prev) => [...prev, created]);
      }

      resetForm(); // Reset form after submit

      // Optional callback for parent
      if (onSubmitHandler) onSubmitHandler(payload);
    } catch (error) {
      console.error('Form submission failed:', error);
    }
  };

  const handleDeleteInstance = async (id: number) => {
    await deleteInstance(id);
    setInstances((prev) => prev.filter((i) => i.instance_id !== id));
  };

  /**
   * On clicking edit, populate form with selected instance data
   */
  const handleEditClick = (instance: EventInstance) => {
    const dateObj = new Date(instance.date_time);
    const date = dateObj.toISOString().split('T')[0];
    const time = dateObj.toTimeString().slice(0, 5);

    setEditInstance({
      ...instance,
      date_time: instance.date_time,
      date,
      time,
    } as any);
  };

  const formikRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    resetFormState: () => {
      formikRef.current?.resetForm();
      setEditInstance(null);
      setInstances([]);
    },

    loadInstanceForEdit: (instance: EventInstance) => {
      const dateObj = new Date(instance.date_time);
      const date = dateObj.toISOString().split('T')[0];
      const time = dateObj.toTimeString().slice(0, 5);

      setEditInstance({
        ...instance,
        date,
        time,
      } as any);
    },
  }));

  return (
    <div className="space-y-6">
      {/* Modals */}
      <AddVenueModal
        open={venueModalOpen}
        onOpenChange={setVenueModalOpen}
        onCreate={() => setVenueModalOpen(false)}
      />
      <AddArtistModal
        open={artistModalOpen}
        onOpenChange={setArtistModalOpen}
        onCreate={() => setArtistModalOpen(false)}
      />

      {/* Formik Form */}
      <Formik
        enableReinitialize
        initialValues={
          editInstance
            ? {
                date: new Date(editInstance.date_time)
                  .toISOString()
                  .split('T')[0],
                time: new Date(editInstance.date_time)
                  .toTimeString()
                  .slice(0, 5),
                venue_id: String(editInstance.venue_id),
                artist_ids:
                  editInstance.Artists.map((artist) =>
                    artist.artist_id.toString()
                  ) || [],
                tickets: editInstance.TicketTypes || [],
                editingInstanceId: editInstance.instance_id,
              }
            : initialValues
        }
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ values, isSubmitting, setFieldValue }) => (
          <Form className="space-y-4">
            {/* Date & Time */}
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block font-semibold">Date</label>
                <Field
                  type="date"
                  name="date"
                  className="w-full border p-2 rounded"
                />
                <ErrorMessage
                  name="date"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="w-1/2">
                <label className="block font-semibold">Time</label>
                <Field
                  type="time"
                  name="time"
                  className="w-full border p-2 rounded"
                />
                <ErrorMessage
                  name="time"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            {/* Venue */}
            <div>
              <label className="block font-semibold">Venue</label>
              <div className="flex gap-4">
                <Field
                  as="select"
                  name="venue_id"
                  className="w-full border p-2 rounded"
                >
                  <option value="">Select Venue</option>
                  {venuesList.map((venue) => (
                    <option key={venue.venue_id} value={venue.venue_id}>
                      {venue.name}
                    </option>
                  ))}
                </Field>
                <Button
                  type="button"
                  variant="mono"
                  onClick={() => setVenueModalOpen(true)}
                >
                  + Add new
                </Button>
              </div>
              <ErrorMessage
                name="venue_id"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Artists with Chips */}
            <div>
              <label className="block font-semibold mb-1">Artists</label>
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap gap-2 border p-2 rounded min-h-[48px]">
                  {values.artist_ids.length === 0 ? (
                    <span className="text-gray-500 italic">
                      No artist selected
                    </span>
                  ) : (
                    values.artist_ids.map((id) => {
                      const artist = artistsList.find(
                        (a) => a.artist_id === parseInt(id)
                      );
                      return (
                        <div
                          key={id}
                          className="flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm"
                        >
                          <span>{artist?.name || 'Unknown'}</span>
                          <button
                            type="button"
                            className="ml-2 text-gray-600 hover:text-red-600"
                            onClick={() =>
                              setFieldValue(
                                'artist_ids',
                                values.artist_ids.filter((a) => a !== id)
                              )
                            }
                          >
                            ×
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Dropdown to add artist */}
                <div className="flex gap-4">
                  <select
                    className="w-full border p-2 rounded bg-white"
                    value=""
                    onChange={(e) => {
                      const selectedId = e.target.value;
                      if (
                        selectedId &&
                        !values.artist_ids.includes(selectedId)
                      ) {
                        setFieldValue('artist_ids', [
                          ...values.artist_ids,
                          selectedId,
                        ]);
                      }
                    }}
                  >
                    <option value="">Select Artist</option>
                    {artistsList.map((artist) => (
                      <option
                        key={artist.artist_id}
                        value={artist.artist_id}
                        disabled={values.artist_ids.includes(
                          String(artist.artist_id)
                        )}
                      >
                        {artist.name}
                      </option>
                    ))}
                  </select>
                  <Button
                    type="button"
                    variant="mono"
                    onClick={() => setArtistModalOpen(true)}
                  >
                    + Add new
                  </Button>
                </div>
              </div>
              <ErrorMessage
                name="artist_ids"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Ticket Fields */}
            <div className="p-2 border rounded">
              <label className="block font-semibold">Ticket Types</label>
              <FieldArray name="tickets">
                {({ push, remove }) => (
                  <div className="space-y-4">
                    {values.tickets.map((ticket, index) => (
                      <div key={index} className="flex gap-3">
                        <input
                          type="text"
                          name={`tickets.${index}.name`}
                          placeholder="Name"
                          value={ticket.name}
                          onChange={(e) =>
                            setFieldValue(
                              `tickets.${index}.name`,
                              e.target.value
                            )
                          }
                          className="w-full border p-2 rounded"
                        />
                        <input
                          type="number"
                          name={`tickets.${index}.price`}
                          placeholder="Price"
                          value={ticket.price}
                          onChange={(e) =>
                            setFieldValue(
                              `tickets.${index}.price`,
                              Number(e.target.value)
                            )
                          }
                          className="w-full border p-2 rounded"
                        />
                        <input
                          type="number"
                          name={`tickets.${index}.total_seats`}
                          placeholder="Seats"
                          value={ticket.total_seats}
                          onChange={(e) =>
                            setFieldValue(
                              `tickets.${index}.total_seats`,
                              Number(e.target.value)
                            )
                          }
                          className="w-full border p-2 rounded"
                        />
                        <Button
                          type="button"
                          size="icon"
                          variant="destructive"
                          onClick={() => remove(index)}
                        >
                          <FaTrashAlt />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      onClick={() =>
                        push({ name: '', price: 0, total_seats: 0 })
                      }
                      className="w-full"
                    >
                      + Add Ticket
                    </Button>
                  </div>
                )}
              </FieldArray>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {values.editingInstanceId
                  ? 'Update Instance'
                  : 'Add Event Instance'}
              </Button>
            </div>
          </Form>
        )}
      </Formik>

      {/* Render Event Instances */}
      <div className={initialValues.editingInstanceId ? `hidden`:`mt-6 space-y-4`}>
        <h2 className="text-lg font-bold">Created Event Instances</h2>
        {instances.length === 0 ? (
          <p>No Instances</p>
        ) : (
          instances.map((instance) => (
            <div
              key={instance.instance_id}
              className="border p-4 rounded shadow"
            >
              <p>
                <strong>Date:</strong> {formatDate(instance.date_time)}
              </p>
              <p>
                <strong>Time:</strong> {formatTime(instance.date_time)}
              </p>
              <p>
                <strong>Venue ID:</strong> {instance.venue_id}
              </p>
              <p>
                <strong>Artists:</strong>{' '}
                {instance.Artists.map((a) => a.name).join(', ')}
              </p>
              <p>Ticket types</p>
              <ul className="list-disc pl-5">
                {instance.TicketTypes?.map((ticket, idx) => (
                  <li key={idx}>
                    {ticket.name} – ₹{ticket.price} – {ticket.total_seats} seats
                  </li>
                ))}
              </ul>
              <div className="flex gap-2 mt-2">
                <Button
                  onClick={() => handleEditClick(instance)}
                  className="bg-yellow-500 text-white"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDeleteInstance(instance.instance_id)}
                  className="bg-red-600 text-white"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
});

export default EventInstanceForm;
