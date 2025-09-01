export interface API_Response<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface UserBookings {
  booking_id: number;
  event_name: string;
  time: string;
  venue: string;
  status: 'CONFIRMED' | 'CANCELLED' | 'PENDING' | 'EXPIRED';
  quantity: number;
}

export interface ArtistsApi {
  artist_id: number;
  name: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface VenueApi {
  venue_id: number;
  name: string;
  address: string;
  city: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface TicketType {
  ticket_type_id: string;
  instance_id: number;
  name: string;
  price: string | number;
  total_seats: string | number;
  available_seats: number;
  createdAt: string;
  updatedAt: string;
}