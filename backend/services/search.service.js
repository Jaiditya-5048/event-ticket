import { fetchSearchResults } from '../repositories/search.repository.js';

export const searchService = async ({ q, category }) => {
  const results = await fetchSearchResults({ q, category });

  if (!results.length) {
    return [];
  }

  return results.map((instance) => {
    const data = instance.toJSON();
    return {
      date: data.date_time,
      event: {
        name: data.Event?.name || '',
        category: data.Event?.Category?.name || null,
      },
      venue: data.Venue,
      artists: Array.isArray(data.Artists)
        ? data.Artists.map((a) => a.name)
        : [],
    };
  });
};
