// components/BookingCard.tsx
import dayjs from 'dayjs';
import { FC } from 'react';
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
} from 'react-icons/fa';
import { UserBookings } from '../utils/types/api';

interface BookingCardProps {
  booking: UserBookings;
}

const BookingCard: FC<BookingCardProps> = ({ booking }) => {
  const statusIcon =
    booking.status === 'CONFIRMED' ? (
      <FaCheckCircle className="text-green-500" />
    ) : (
      <FaTimesCircle className="text-red-500" />
    );

  return (
    <div className="bg-white shadow-lg rounded-2xl p-5 w-full max-w-xl mx-auto my-4 border border-gray-200">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold text-gray-800">
          Booking #{booking.booking_id}
        </h2>
        <div className="flex items-center gap-1 text-sm font-semibold text-gray-700">
          {statusIcon}
          <span>{booking.status}</span>
        </div>
      </div>

      <div className="text-gray-700 space-y-4 text-sm">
        {/* name */}
        <div className="flex items-center gap-1">
          {/* <FaClock className="text-blue-500" /> */}
          <span className="font-medium text-2xl">
            {booking.event_name}
          </span>
        </div>
        {/* time */}
        <div className="flex items-center gap-1">
          <FaClock className="text-blue-500" />
          <span className="font-medium">
            {dayjs(booking.time).format('h:mm A')}
          </span>
        </div>
        {/* date */}
        <div className="flex items-center gap-1">
          <FaCalendarAlt className="text-blue-500" />
          <span className="font-medium">
            {dayjs(booking.time).format('D MMM, YYYY')}
          </span>
        </div>
        {/* venue */}
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-purple-500" />
          <span>{booking.venue}</span>
        </div>
        {/* quantity */}
        <div className="flex items-center gap-2">
          <span className="font-semibold">Tickets:</span>
          <span>{booking.quantity}</span>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
