import { Op } from 'sequelize';
import db from '../models/index.js';

const { EventInstance, Event, Venue, Artist, EventCategory } = db;

export const fetchSearchResults = async ({ q, category }) => {
  const searchTerm = `%${q.trim()}%`;
  const lowerCategory = category?.toLowerCase();

  let eventWhere = {};
  let venueWhere = {};
  let artistWhere = {};
  let artistRequired = false;

  if (lowerCategory === 'event') {
    eventWhere = { name: { [Op.like]: searchTerm } };
  } else if (lowerCategory === 'venue') {
    venueWhere = { name: { [Op.like]: searchTerm } };
  } else if (lowerCategory === 'artist') {
    artistWhere = { name: { [Op.like]: searchTerm } };
    artistRequired = true;
  } else {
    eventWhere = { name: { [Op.like]: searchTerm } };
    venueWhere = { name: { [Op.like]: searchTerm } };
    artistWhere = { name: { [Op.like]: searchTerm } };
  }

  return EventInstance.findAll({
    limit: 10,
    include: [
      {
        model: Venue,
        attributes: ['venue_id', 'name', 'address', 'city'],
        where: Object.keys(venueWhere).length ? venueWhere : undefined,
      },
      {
        model: Event,
        attributes: ['name', 'category_id'],
        where: Object.keys(eventWhere).length ? eventWhere : undefined,
        include: [
          {
            model: EventCategory,
            as: 'Category',
            attributes: ['name'],
          },
        ],
      },
      {
        model: Artist,
        attributes: ['name'],
        through: { attributes: [] },
        where: Object.keys(artistWhere).length ? artistWhere : undefined,
        required: artistRequired,
      },
    ],
  });
};
