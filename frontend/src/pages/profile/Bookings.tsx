// pages/BookingsPage.tsx
import { useEffect, useState } from 'react';
import BookingCard from '../../components/BookingCard';
import axios from 'axios';
import { getUserBookings } from '../../apis/services/user_api';
import { UserBookings } from '../../utils/types/api';

const Bookings = () => {
  const [bookings, setBookings] = useState<UserBookings[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await getUserBookings(); // calling the API function
        console.log(res);
        setBookings(res);
      } catch (err) {
        console.error('Failed to fetch bookings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        My Bookings
      </h1>

      {loading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : bookings.length === 0 ? (
        <div className="text-center text-gray-500">No bookings found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bookings.map((booking) => (
            <BookingCard key={booking.booking_id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;
