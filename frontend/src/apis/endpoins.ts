const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const AUTH_ENDPOINTS = {
  LOGIN: `${API_URL}/auth/login`,
  SIGNUP: `${API_URL}/auth/signup`,
};

export const EVENT_ENDPOINTS = {
  ALL_EVENTS: `${API_URL}/events`,
  EVENT_BY_ID: (id: string) => `${API_URL}/events/${id}`,
  ALL_INSTANCES_OF_EVENT: (eventId: string) =>
    `${API_URL}/events/${eventId}/instances`,
};

export const INSTANCE_ENDPOINTS = {
  INSTANCES_LOCATION: (city?: string) =>
    city
      ? `${API_URL}/instances?city=${encodeURIComponent(city)}`
      : `${API_URL}/instances`,
  INSTANCE_BY_ID: (instanceId: string) =>
    `${API_URL}/instances/${instanceId}`,
  TICKET_TYPES_BY_INSTANCE_ID: (instanceId: string) =>
    `${API_URL}/instances/${instanceId}/ticket-types`,
};

export const SEARCH = {
  MAIN_SEARCH: (query: string, category?: string) => {
    const base = `${API_URL}/search?q=${encodeURIComponent(query)}`;
    return category ? `${base}&category=${encodeURIComponent(category)}` : base;
  },
};

export const USER_ENDPOINTS = {
  USER_API: `${API_URL}/user/me`,
  USER_BOOKINGS: `${API_URL}/user/bookings`,
};

export const BOOKING_ENDPOINTS = {
  BOOK_TICKETS: (instanceId: string) =>
    `${API_URL}/instances/${instanceId}/booking`,
};

export const ORGANISER_ARTISTS_ENDPOINTS = {
  ADD_ARTIST: `${API_URL}/organiser/artists`,
  GET_ARTISTS: `${API_URL}/organiser/artists`,
  GET_ARTIST_BY_ID: (artistId: string) =>
    `${API_URL}/organiser/artists/${artistId}`,
  UPDATE_ARTIST: (artistId: string) =>
    `${API_URL}/organiser/artists/${artistId}`,
  DELETE_ARTIST: (artistId: string) =>
    `${API_URL}/organiser/artists/${artistId}`,
};

export const ORGANISER_VENUE_ENDPOINTS = {
  ADD_VENUE: `${API_URL}/organiser/venue`,
  GET_VENUES: `${API_URL}/organiser/venue`,
  GET_VENUE_BY_ID: (venueId: string) => `${API_URL}/organiser/venue/${venueId}`,
  UPDATE_VENUE: (venueId: string) => `${API_URL}/organiser/venue/${venueId}`,
  DELETE_VENUE: (venueId: string) => `${API_URL}/organiser/venue/${venueId}`,
};

export const ORGANISER_EVENT_ENDPOINTS = {
  CREATE_EVENT: `${API_URL}/organiser/events`,
  GET_EVENTS: `${API_URL}/organiser/events`,
  GET_EVENT_BY_ID: (eventId: string) =>
    `${API_URL}/organiser/events/${eventId}`,
  UPDATE_EVENT: (eventId: string) => `${API_URL}/organiser/events/${eventId}`,
  DELETE_EVENT: (eventId: string) => `${API_URL}/organiser/events/${eventId}`,
};

export const ORGANISER_INSTANCE_ENDPOINTS = {
  CREATE_INSTANCE: `${API_URL}/organiser/instance`,
  UPDATE_INSTANCE: (instanceId: number) =>
    `${API_URL}/organiser/instance/${instanceId}`,
  DELETE_INSTANCE: (instanceId: number) =>
    `${API_URL}/organiser/instance/${instanceId}`,
};

export const ORGANISER_TICKET_TYPE_ENDPOINTS = {
  CREATE_TICKET_TYPE: (instanceId: string) =>
    `${API_URL}/organiser/ticket-types/${instanceId}`,
  GET_TICKET_TYPE: `${API_URL}/organiser/ticket-types`,
  GET_TICKET_TYPE_BY_ID: (ticketTypeId: string) =>
    `${API_URL}/organiser/ticket-types/${ticketTypeId}`,
  UPDATE_TICKET_TYPE: (ticketTypeId: string) =>
    `${API_URL}/organiser/ticket-types/${ticketTypeId}`,
  DELETE_TICKET_TYPE: (ticketTypeId: string) =>
    `${API_URL}/organiser/ticket-types/${ticketTypeId}`,
};

export const ORGANISER_INSTANCE_ARTIST_ENDPOINTS = {
  ADD_INSTANCE_ARTIST: `${API_URL}/organiser/instance-artist`,
  DELETE_INSTANCE_ARTIST: (instance_id: string, artist_id: string) =>
    `${API_URL}/organiser/instance-artist?instance_id=${instance_id}&artist_id=${artist_id}`,
};