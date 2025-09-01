import { API_Response } from '../../utils/types/api';
import { requestBuilder } from '../apiWrapper';
import { BOOKING_ENDPOINTS } from '../endpoins';

type BookingPayload = {
  ticket_type_id: number;
  quantity: number;
};

interface Booking {
  booking_id: number;
  user_id: number;
  booking_date: string; // ISO 8601 date-time string
  total_price: number;
  BookingStatus: 'CONFIRMED' | 'PENDING' | 'CANCELLED'; // Extend as needed
  createdAt: string;
  updatedAt: string;
}

export const bookTickets = async (
  instanceId: number,
  payload: BookingPayload
): Promise<Booking> => {
  try {
    const url = BOOKING_ENDPOINTS.BOOK_TICKETS(instanceId);
    const response = await requestBuilder.postAuth<API_Response<Booking>>(
      url,
      payload
    );
    return response.data;
  } catch (error) {
    console.log('Failed to book tickets', error);
    throw error;
  }
};
