import { API_Response } from "../../../utils/types/api";
import { requestBuilder } from "../../apiWrapper";
import { ORGANISER_INSTANCE_ARTIST_ENDPOINTS } from "../../endpoins";

type payload = {
  instance_id: number;
  artist_id: number;
};

type apiResponse = {
    id: number,
    instance_id: number,
    artist_id: number,
    updatedAt: string,
    createdAt: string
  }

export const addArtistToInstance = async (payload: payload) : Promise<apiResponse> => {
  try {
    const response = await requestBuilder.postAuth<API_Response<apiResponse>>(
      ORGANISER_INSTANCE_ARTIST_ENDPOINTS.ADD_INSTANCE_ARTIST,
      payload
    );
    return response.data
  } catch (error) {
      console.error('Failed to add artist to instance:', error);
      throw error;
  };
};

export const removeArtistFromInstance = async (artist_id:number, instance_id:number) : Promise<string> => {
  try {
    const response = await requestBuilder.deleteAuth<API_Response<null>>(
      ORGANISER_INSTANCE_ARTIST_ENDPOINTS.DELETE_INSTANCE_ARTIST(artist_id,instance_id),
    );
    return response.message
  } catch (error) {
      console.error('Failed to remove artist from instance:', error);
      throw error;
  }
}