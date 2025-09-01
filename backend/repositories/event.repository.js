// repositories/event.repository.js
import db from '../models/index.js';
const { Event, User, Ticket, EventInstance, Venue, Booking, EventCategory } = db;

export const findEventById = (id, organiserId = null) => {
  const where = { event_id: id };
  if (organiserId) {
    where.organiser_id = organiserId;
  }

  return Event.findOne({
    where,
    attributes: ['event_id', 'name', 'description'],
    include: [
      {
        model: EventInstance,
        attributes: ['instance_id','date_time'],
        include: [
          {
            model: Venue,
            attributes: ['venue_id', 'name', 'address' ,'city'],
          },
        ],
      },
      {
        model: EventCategory,
        as: 'Category',
        attributes: ['category_id', 'name'],
      },
    ],
  });
};

export const findAllEvents = (organiserId = null) => {
  const whereClause = organiserId ? { organiser_id: organiserId } : {};

  return Event.findAll({
    where: whereClause,
    attributes: ['event_id', 'name', 'description'],
    include: [
      {
        model: EventInstance,
        attributes: ['instance_id' , 'date_time'],
        include: [
          {
            model: Venue,
            attributes: ['venue_id', 'name', 'address', 'city'],
          },
        ],
      },
      {
        model: EventCategory,
        as: 'Category',
        attributes: ['category_id', 'name'],
      },
    ],
  });
};

export const updateEventRepo = async (id, data) => {
  await Event.update(data, { where: { event_id: id } });
  return Event.findByPk(id);
};

export const createEventRepo = (eventData) => {
  return Event.create(eventData);
};

export const deleteEventRepo = async (id) => {
  const event = await Event.findByPk(id);
  return event.destroy();
};