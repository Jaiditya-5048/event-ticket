import React, { useState, useEffect } from 'react';
import * as Select from '@radix-ui/react-select';
import { faChevronDown, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EventInstance } from '../../utils/types/event_types';
import { bookTickets } from '../../apis/services/booking_api';
import { fetchTicketsByInstanceId } from '../../apis/services/instance_api';
import { toast } from 'react-toastify';
import { formatDate } from '../../utils/formatDateTime';
import { TicketType } from '@/utils/types/api';

type EventBookingModalProps = {
  eventInstance: EventInstance;
  onClose: () => void;
  onBook: () => void;
};

const EventBookingModal: React.FC<EventBookingModalProps> = ({
  eventInstance,
  onClose,
  onBook,
}) => {
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [isFormValid, setIsFormValid] = useState(false);

  const selectedTicket = ticketTypes.find((t) => t.name === selectedType);
  const maxAllowed = selectedTicket
    ? Math.min(10, selectedTicket.available_seats)
    : 10;

  const totalPrice = selectedTicket
    ? Number((Number(selectedTicket.price) * quantity).toFixed(2))
    : 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: TicketType[] = await fetchTicketsByInstanceId(
          eventInstance.instance_id
        );
        setTicketTypes(res);
      } catch (error) {
        console.error('Failed to fetch ticket types:', error);
      }
    };
    fetchData();
  }, [eventInstance.instance_id]);

  useEffect(() => {
    setSelectedDate(formatDate(eventInstance.date_time));
  }, [eventInstance]);

  useEffect(() => {
    setIsFormValid(!!selectedDate && !!selectedType && quantity >= 1);
  }, [selectedDate, selectedType, quantity]);

  useEffect(() => {
    if (selectedType) {
      setQuantity(1); // Reset to 1 whenever ticket type changes
    }
  }, [selectedType]);
  

  if (!eventInstance) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).id === 'modal-backdrop') {
      onClose();
    }
  };

  const handleBook = async () => {
    if (!selectedTicket) return;

    const bookingDetails = {
      ticket_type_id: selectedTicket.ticket_type_id,
      quantity: quantity,
    };

    try {
      const response = await bookTickets(
        eventInstance.instance_id,
        bookingDetails
      );
      toast.success('Tickets booked successfully!');
      console.log('Booking successful:', response);
      onBook();
    } catch (error) {
      toast.error('Failed to book tickets. Please try again.');
      console.error('Booking failed:', error);
    }
  };

  return (
    <div
      id="modal-backdrop"
      className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-semibold mb-4">
          {eventInstance.Venue.name}
        </h2>

        <p className="text-gray-600 mb-2">
          <span className="font-medium">Location:</span>{' '}
          {eventInstance.Venue.address + ', ' + eventInstance.Venue.city}
        </p>

        <p className="text-gray-600 mb-4">
          <span className="font-medium">Date:</span>{' '}
          {formatDate(eventInstance.date_time)}
        </p>

        {/* Ticket Type Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Ticket Type:</label>
          <Select.Root
            value={selectedType || ''}
            onValueChange={setSelectedType}
          >
            <Select.Trigger className="w-full border border-gray-300 rounded p-2 text-left flex justify-between items-center focus:outline-none">
              <Select.Value placeholder="Select Type" />
              <Select.Icon>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="h-4 w-4 text-gray-400"
                />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content
                className="z-1000 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto"
                position="popper"
              >
                <Select.Viewport className="p-1">
                  {ticketTypes.map((ticket: TicketType) => (
                    <Select.Item
                      key={ticket.ticket_type_id}
                      value={ticket.name}
                      className=" px-4 py-2 w-97 text-sm text-left cursor-pointer hover:bg-purple-100 rounded flex justify-between items-center select-none"
                    >
                      <span>{ticket.name}</span>
                      <span className="text-gray-600 text-sm flex items-center gap-2">
                        ₹ {ticket.price}
                        <Select.ItemIndicator>
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="h-4 w-4 text-purple-600"
                          />
                        </Select.ItemIndicator>
                      </span>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>

        {/* Quantity Input */}
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-sm font-medium mb-1">
            Quantity:
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
            >
              −
            </button>
            <input
              id="quantity"
              type="number"
              value={quantity}
              min={1}
              max={maxAllowed}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setQuantity(
                  isNaN(val) ? 1 : Math.max(1, Math.min(maxAllowed, val))
                );
              }}
              className="w-16 text-center border border-gray-300 rounded p-1"
            />
            <button
              type="button"
              onClick={() =>
                setQuantity((prev) => Math.min(maxAllowed, prev + 1))
              }
              disabled={quantity >= maxAllowed}
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              +
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Max {maxAllowed} tickets per booking.
          </p>
        </div>

        {/* Total Price */}
        {selectedTicket && (
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">
              Total Price:
            </label>
            <p className="text-lg font-semibold">₹ {totalPrice}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleBook}
            disabled={!isFormValid}
            className={`px-4 py-2 rounded text-white ${
              isFormValid
                ? 'bg-purple-600 hover:bg-purple-700'
                : 'bg-purple-300 cursor-not-allowed'
            }`}
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
};

export { EventBookingModal };
