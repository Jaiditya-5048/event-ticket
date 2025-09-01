import { API_Response } from '../../utils/types/api';
import { Event, EventInstance } from '../../utils/types/event_types';
import { requestBuilder } from '../apiWrapper';
import { EVENT_ENDPOINTS } from '../endpoins';

export const getAllEvents = async (): Promise<Event[]> => {
  try {
    const response = await requestBuilder.get<API_Response<Event[]>>(
      EVENT_ENDPOINTS.ALL_EVENTS
    );
    return response.data;
  } catch (error) {
    console.error('Failed to Login:', error);
    throw error;
  }
};

export const getEventById = async (id: string): Promise<Event> => {
  try {
    const url = EVENT_ENDPOINTS.EVENT_BY_ID(id);
    const response = await requestBuilder.get<API_Response<Event>>(url);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch event by ID:', error);
    throw error;
  }
};

export const getAllEventInstacesById = async (
  eventId: string
): Promise<EventInstance[]> => {
  try {
    const url = EVENT_ENDPOINTS.ALL_INSTANCES_OF_EVENT(eventId);
    const response =
      await requestBuilder.get<API_Response<EventInstance[]>>(url);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch event instances:', error);
    throw error;
  }
};
