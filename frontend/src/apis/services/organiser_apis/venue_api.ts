import { API_Response, VenueApi } from "../../../utils/types/api";
import { requestBuilder } from "../../apiWrapper";
import { ORGANISER_VENUE_ENDPOINTS } from "../../endpoins";

type VenuePayload = Pick<VenueApi, 'name' | 'address' | 'city'>;

export const addvenue = async (paylod: VenuePayload): Promise<VenueApi> => {
  try {
    const response = await requestBuilder.postAuth<API_Response<VenueApi>>(
      ORGANISER_VENUE_ENDPOINTS.ADD_VENUE,
      paylod
    );
    return response.data;
  } catch (error) {
    console.error('Failed to add Venue:', error);
    throw error;
  }
};

export const getAllVenue = async (): Promise<VenueApi[]> => {
  try {
    const response = await requestBuilder.getAuth<API_Response<VenueApi[]>>(
      ORGANISER_VENUE_ENDPOINTS.GET_VENUES
    );
    return response.data;
  } catch (error) {
    console.error('Failed to get Venues:', error);
    throw error;
  }
};

export const getVenueById = async (venueId: number): Promise<VenueApi> => {
  try {
    const response = await requestBuilder.getAuth<API_Response<VenueApi>>(
      ORGANISER_VENUE_ENDPOINTS.GET_VENUE_BY_ID(venueId)
    );
    return response.data;
  } catch (error) {
    console.error('Failed to get Venue by ID:', error);
    throw error;
  }
};

export const updateVenue = async (
  venueId: number,
  payload: Partial<VenuePayload>
): Promise<VenueApi> => {
  try {
    const response = await requestBuilder.putAuth<API_Response<VenueApi>>(
      ORGANISER_VENUE_ENDPOINTS.UPDATE_VENUE(venueId),
      payload
    );
    return response.data;
  } catch (error) {
    console.error('Failed to update Venue:', error);
    throw error;
  }
};

export const deleteVenue = async (venueId: number): Promise<string> => {
  try {
    const response = await requestBuilder.deleteAuth<API_Response<null>>(
      ORGANISER_VENUE_ENDPOINTS.DELETE_VENUE(venueId)
    );
    return response.message;
  } catch (error) {
    console.error('Failed to delete Venue:', error);
    throw error;
  }
};