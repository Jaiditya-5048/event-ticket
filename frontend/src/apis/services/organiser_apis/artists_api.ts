import { API_Response, ArtistsApi } from "../../../utils/types/api";
import { requestBuilder } from "../../apiWrapper";
import { ORGANISER_ARTISTS_ENDPOINTS } from "../../endpoins";

type artistsPayload = Pick<ArtistsApi, 'name' | 'bio'>;

export const addArtist = async (paylod: artistsPayload): Promise<ArtistsApi> => {
  try {
    const response = await requestBuilder.postAuth<API_Response<ArtistsApi>>(
      ORGANISER_ARTISTS_ENDPOINTS.ADD_ARTIST,
      paylod
    );
    return response.data;
  } catch (error) {
    console.error('Failed to Add add Artist:', error);
    throw error;
  }
};

export const getAllArtists = async (): Promise<ArtistsApi[]> => {
  try {
    const response = await requestBuilder.getAuth<API_Response<ArtistsApi[]>>(
      ORGANISER_ARTISTS_ENDPOINTS.GET_ARTISTS
    );
    return response.data;
  } catch (error) {
    console.error('Failed to get Artists:', error);
    throw error;
  }
};

export const getArtistById = async (
  artistId: number
): Promise<ArtistsApi> => {
  try {
    const response = await requestBuilder.getAuth<API_Response<ArtistsApi>>(
      ORGANISER_ARTISTS_ENDPOINTS.GET_ARTIST_BY_ID(artistId)
    );
    return response.data;
  } catch (error) {
    console.error('Failed to get Artist by ID:', error);
    throw error;
  }
};

export const updateArtist = async (
  artistId: number,
  payload: Partial<artistsPayload>
): Promise<ArtistsApi> => {
  try {
    const response = await requestBuilder.putAuth<API_Response<ArtistsApi>>(
      ORGANISER_ARTISTS_ENDPOINTS.UPDATE_ARTIST(artistId),
      payload
    );
    return response.data;
  } catch (error) {
    console.error('Failed to update Artist:', error);
    throw error;
  }
};

export const deleteArtist = async (artistId: number): Promise<string> => {
  try {
    const response = await requestBuilder.deleteAuth<API_Response<null>>(
      ORGANISER_ARTISTS_ENDPOINTS.DELETE_ARTIST(artistId)
    );
    return response.message;
  } catch (error) {
    console.error('Failed to delete Artist:', error);
    throw error;
  }
};