import { API_Response, TicketType } from '../../utils/types/api';
import { EventInstance } from '../../utils/types/event_types';
import { requestBuilder } from '../apiWrapper';
import { INSTANCE_ENDPOINTS } from '../endpoins';

export const fetchInstancesByLocation = async (
  city?: string
): Promise<EventInstance[]> => {
  try {
    const url = INSTANCE_ENDPOINTS.INSTANCES_LOCATION(city);
    const response =
      await requestBuilder.get<API_Response<EventInstance[]>>(url);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch event instances by location:', error);
    throw error;
  }
};

export const getEventInstanceById = async (
  instanceId: string
): Promise<EventInstance> => {
  try {
    const url = INSTANCE_ENDPOINTS.INSTANCE_BY_ID(instanceId);
    const response = await requestBuilder.get<API_Response<EventInstance>>(url);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch event instance:', error);
    throw error;
  }
};

export const fetchTicketsByInstanceId = async (
  instanceId: string
): Promise<TicketType[]> => {
  try {
    const url = INSTANCE_ENDPOINTS.TICKET_TYPES_BY_INSTANCE_ID(instanceId);
    const response = await requestBuilder.get<API_Response<TicketType[]>>(url);
    return response.data;
  } catch (error) {
    console.log('Failed to fetch tickets by instance ID:', error);
    throw error;
  }
};
