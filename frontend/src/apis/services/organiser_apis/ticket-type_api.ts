import { API_Response, TicketType } from "../../../utils/types/api";
import { requestBuilder } from "../../apiWrapper";
import { ORGANISER_TICKET_TYPE_ENDPOINTS } from "../../endpoins";

type TicketTypePayload = Pick<TicketType, 'instance_id' | 'name' | 'price' | 'total_seats'>;
type AllTickets = {instance_id: number; tickets: TicketType[]}

export const addTicketType = async (
  instanceId: string,
  paylod: TicketTypePayload
): Promise<TicketType> => {
  try {
    const response = await requestBuilder.postAuth<API_Response<TicketType>>(
      ORGANISER_TICKET_TYPE_ENDPOINTS.CREATE_TICKET_TYPE(instanceId),
      paylod
    );
    return response.data;
  } catch (error) {
    console.error('Failed to add Ticket Type:', error);
    throw error;
  }
};

export const getAllTicketTypes = async (): Promise<AllTickets[]> => {
  try {
    const response = await requestBuilder.getAuth<API_Response<AllTickets[]>>(
      ORGANISER_TICKET_TYPE_ENDPOINTS.GET_TICKET_TYPE
    );
    return response.data;
  } catch (error) {
    console.error('Failed to get Ticket Types:', error);
    throw error;
  }
};

export const getTicketTypeById = async (ticketTypeId: string): Promise<TicketType> => {
  try {
    const response = await requestBuilder.getAuth<API_Response<TicketType>>(
      ORGANISER_TICKET_TYPE_ENDPOINTS.GET_TICKET_TYPE_BY_ID(ticketTypeId)
    );
    return response.data;
  } catch (error) {
    console.error('Failed to get Ticket Type by ID:', error);
    throw error;
  }
};

export const updateTicketType = async (
  ticketTypeId: string,
  payload: Partial<TicketTypePayload>
): Promise<TicketType> => {
  try {
    const response = await requestBuilder.putAuth<API_Response<TicketType>>(
      ORGANISER_TICKET_TYPE_ENDPOINTS.UPDATE_TICKET_TYPE(ticketTypeId),
      payload
    );
    return response.data;
  } catch (error) {
    console.error('Failed to update Ticket Type:', error);
    throw error;
  }
};

export const deleteTicketType = async (ticketTypeId: string): Promise<string> => {
  try {
    const response = await requestBuilder.deleteAuth<API_Response<null>>(
      ORGANISER_TICKET_TYPE_ENDPOINTS.DELETE_TICKET_TYPE(ticketTypeId)
    );
    return response.message;
  } catch (error) {
    console.error('Failed to delete Ticket Type:', error);
    throw error;
  }
};