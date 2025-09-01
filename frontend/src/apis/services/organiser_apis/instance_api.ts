import { API_Response, TicketType } from "../../../utils/types/api";
import { EventInstance } from "../../../utils/types/event_types";
import { requestBuilder } from "../../apiWrapper";
import { ORGANISER_INSTANCE_ENDPOINTS } from "../../endpoins";

type InstancePayload = {
  event_id: number;
  venue_id: number;
  artist_ids: string[];
  date_time: string;
  capacity: number;
  tickets: Pick<TicketType, 'name' | 'price' | 'total_seats'>[]
};

export const createInstance = async (
  paylod: InstancePayload
): Promise<EventInstance> => {
  try {
    const response = await requestBuilder.postAuth<API_Response<EventInstance>>(
      ORGANISER_INSTANCE_ENDPOINTS.CREATE_INSTANCE,
      paylod
    );
    return response.data;
  } catch (error) {
    console.error('Failed to create instance:', error);
    throw error;
  }
};

export const updateInstance = async (
  instanceId: number,
  payload: Partial<InstancePayload>
): Promise<EventInstance> => {
  try {
    const response = await requestBuilder.putAuth<API_Response<EventInstance>>(
      ORGANISER_INSTANCE_ENDPOINTS.UPDATE_INSTANCE(instanceId),
      payload
    );
    return response.data;
  } catch (error) {
    console.error('Failed to update instance:', error);
    throw error;
  }
};

export const deleteInstance = async (instanceId: number): Promise<string> => {
  try {
    const response = await requestBuilder.deleteAuth<API_Response<null>>(
      ORGANISER_INSTANCE_ENDPOINTS.DELETE_INSTANCE(instanceId)
    );
    return response.message;
  } catch (error) {
    console.error('Failed to delete instance:', error);
    throw error;
  }
};