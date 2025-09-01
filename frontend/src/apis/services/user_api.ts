import { API_Response, UserBookings } from '../../utils/types/api';
import { User } from '../../utils/types/user_types';
import { requestBuilder } from '../apiWrapper';
import { USER_ENDPOINTS } from '../endpoins';

type UserApiResponse = Pick<User, 'name' | 'email' | 'phone' | 'createdAt'>;
type UpdateUserPayload = Partial<Pick<User, 'name' | 'password' | 'phone'>>;

export const getUser = async (): Promise<UserApiResponse> => {
  try {
    const response = await requestBuilder.getAuth<API_Response<UserApiResponse>>(
      USER_ENDPOINTS.USER_API
    );

    return response.data;
  } catch (error) {
    console.error('Failed to get User:', error);
    throw error;
  }
};

export const updateUser = async (
  data: UpdateUserPayload
): Promise<UserApiResponse> => {
  try {
    const response = await requestBuilder.putAuth<
      API_Response<UserApiResponse>
    >(USER_ENDPOINTS.USER_API, data);
    return response.data;
  } catch (error) {
    console.error('Failed to update User:', error);
    throw error;
  }
};

export const deleteUser = async (): Promise<{ message: string }> => {
  try {
    const response = await requestBuilder.deleteAuth<
      API_Response<{ message: string }>
    >(USER_ENDPOINTS.USER_API);
    return response;
  } catch (error) {
    console.error('Failed to delete User:', error);
    throw error;
  }
};

export const getUserBookings = async (): Promise<UserBookings[]> => {
  try {
    const response = await requestBuilder.getAuth<API_Response<UserBookings[]>>(
      USER_ENDPOINTS.USER_BOOKINGS
    );
    return response.data;
  } catch (error) {
    console.error('Failed to get User Bookings:', error);
    throw error;
  }
}