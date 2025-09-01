import { API_Response } from '../../utils/types/api';
import { User } from '../../utils/types/user_types';
import { requestBuilder } from '../apiWrapper';
import { AUTH_ENDPOINTS } from '../endpoins';

type LoginPayload = Pick<User, 'email' | 'password'>;
type UserSignUpPayload = Pick<User, 'name' | 'email' | 'phone' | 'password'>;
type UserApiResponse = Pick<User, 'id' | 'name' | 'email' | 'phone'>;

export const loginApi = async (
  paylod: LoginPayload
): Promise<{ token: string }> => {
  try {
    const response = await requestBuilder.post<API_Response<{ token: string }>>(
      AUTH_ENDPOINTS.LOGIN,
      paylod
    );
    return response.data;
  } catch (error) {
    console.error('Failed to Login:', error);
    throw error;
  }
};

export const signUpApi = async (
  payload: UserSignUpPayload
): Promise<UserApiResponse> => {
  try {
    const response = await requestBuilder.post<API_Response<UserApiResponse>>(
      AUTH_ENDPOINTS.SIGNUP,
      payload
    );

    return response.data;
  } catch (error) {
    console.error('Failed to Login:', error);
    throw error;
  }
};
