import { API_Response } from "../../../utils/types/api";
import { Event } from "../../../utils/types/event_types";
import { requestBuilder } from "../../apiWrapper";
import { ORGANISER_EVENT_ENDPOINTS } from "../../endpoins";


type EventPayload = {
  name: string;
  description: string;
  category_id: string;
};

export const createEvent = async (paylod: EventPayload): Promise<Event> => {
  try {
    const response = await requestBuilder.postAuth<API_Response<Event>>(
      ORGANISER_EVENT_ENDPOINTS.CREATE_EVENT,
      paylod
    );
    return response.data;
  } catch (error) {
    console.error('Failed to create Event:', error);
    throw error;
  }
};

export const getAllEventsUnderOrganiser = async (): Promise<Event[]> => {
  try {
    const response = await requestBuilder.getAuth<API_Response<Event[]>>(
      ORGANISER_EVENT_ENDPOINTS.GET_EVENTS
    );
    return response.data;
  } catch (error) {
    console.error('Failed to get Events:', error);
    throw error;
  }
};

export const getEventByIdUnderOrganiser = async (eventId: string): Promise<Event> => {
  try {
    const response = await requestBuilder.getAuth<API_Response<Event>>(
      ORGANISER_EVENT_ENDPOINTS.GET_EVENT_BY_ID(eventId)
    );
    return response.data;
  } catch (error) {
    console.error('Failed to get Event by ID:', error);
    throw error;
  }
};

export const updateEvent = async (
  eventId: string,
  payload: Partial<EventPayload>
): Promise<Event> => {
  try {
    const response = await requestBuilder.putAuth<API_Response<Event>>(
      ORGANISER_EVENT_ENDPOINTS.UPDATE_EVENT(eventId),
      payload
    );
    return response.data;
  } catch (error) {
    console.error('Failed to update Event:', error);
    throw error;
  }
};

export const deleteEvent = async (eventId: string): Promise<string> => {
  try {
    const response = await requestBuilder.deleteAuth<API_Response<null>>(
      ORGANISER_EVENT_ENDPOINTS.DELETE_EVENT(eventId)
    );
    return response.message;
  } catch (error) {
    console.error('Failed to delete Event:', error);
    throw error;
  }
};