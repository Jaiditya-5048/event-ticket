import { API_Response } from '../../utils/types/api';
import { EventInstance } from '../../utils/types/event_types';
import { requestBuilder } from '../apiWrapper';
import { SEARCH } from '../endpoins';

export const mainSearch = async (
  query: string,
  category?: string
): Promise<EventInstance[]> => {
  return (
    await requestBuilder.get<API_Response<EventInstance[]>>(
      SEARCH.MAIN_SEARCH(query, category)
    )
  ).data;
};
