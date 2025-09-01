import { Op, fn, col, where } from 'sequelize';
import db from '../models/index.js';
import { createEventInstanceArtist } from './eventInstanceArtist.repository.js';

const { EventInstance, Venue, Event, EventCategory, Artist, TicketType } = db;

// Helper to avoid code repetition
function getIncludes(includeVenue = true) {
  const includes = [];

  if (includeVenue) {
    includes.push({
      model: Venue,
      attributes: ['venue_id', 'name', 'address', 'city'],
    });
  }

  includes.push(
    {
      model: Event,
      attributes: ['name', 'description'],
      include: [
        {
          model: EventCategory,
          as: 'Category',
          attributes: ['category_id','name'],
        },
      ],
    },
    {
      model: Artist,
      attributes: ['artist_id','name'],
      through: { attributes: [] },
    },
    {
      model: TicketType,
      attributes: ['ticket_type_id', 'name' , 'price', 'total_seats', 'available_seats', 'createdAt', 'updatedAt']
    }
  );

  return includes;
}

export const findInstancesByEventId = async (eventId, transaction = null) => {
  return await EventInstance.findAll({
    where: { event_id: eventId },
    include: getIncludes(), // includes associations
    transaction,            // optional
  });
};

export const findInstanceById = async (id, { transaction = null } = {}) => {
  return EventInstance.findByPk(id, {
    include: getIncludes(),
    transaction,
  });
};

export const findInstancesByVenueId = async (venueId) => {
  return EventInstance.findOne({
    where: { venue_id: venueId },
    include: getIncludes(),
  });
}

export const findInstancesByCity = async (city) => {
  return EventInstance.findAll({
    include: [
      {
        model: Venue,
        attributes: ['venue_id', 'name', 'address', 'city'],
        where: city
          ? where(fn('LOWER', col('city')), {
              [Op.like]: `%${city.toLowerCase()}%`,
            })
          : undefined,
      },
      ...getIncludes(false), // exclude Venue from includes
    ],
  });
};



export const createInstanceRepo = async (instanceData, {transaction  = null} = {}) => {
  const instance = await EventInstance.create(instanceData, {transaction});
  return findInstanceById(instance.instance_id)
};

export const updateInstanceRepo = async (instance_id, data) => {
  await EventInstance.update(data, { where: { instance_id: instance_id } });
  return EventInstance.findByPk(instance_id);
}

export const deleteInstanceRepo = async (id, transaction) => {
  return await db.EventInstance.destroy({ where: { instance_id: id }, transaction });
};
