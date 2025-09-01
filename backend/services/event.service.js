import AppError from '../utils/AppError.js';

import {
  findAllEvents,
  findEventById,
  updateEventRepo,
  deleteEventRepo,
  createEventRepo,
} from '../repositories/event.repository.js';
import { findInstancesByEventId } from '../repositories/eventInstance.repository.js';
import Messages from '../utils/responseMessages.js';
import { StatusCodes } from 'http-status-codes';

// Helper const for not found error
const NotFoundAppError = new AppError(Messages.General.NOT_FOUND, StatusCodes.NOT_FOUND);

///////////////////// General Event Services /////////////////////////

// This function retrieves a public event by its ID
export const getPublicEventById = async (id) => {
  const event = await findEventById(id);
  if (!event) throw new AppError(NotFoundAppError);
  return event;
};

export const getPublicAllEvents = async () => {
  const events = await findAllEvents();
  if (!events) throw new AppError(NotFoundAppError);
  return events
};

///////////////////////// Organiser Event Services /////////////////////////



export const getOrganiserEventByIdSerivce = async (id, organiserId) => {
  const event = await findEventById(id, organiserId);
  if (!event) throw new AppError(NotFoundAppError);
  return event;
};

export const getOrganiserEventsService = async (user_id) => {
  const events = await findAllEvents(user_id);
  return events;
};

export const createEventService = async (
  { name, description, category_id }, user_id
) => {
  const organiser_id = user_id;
  
  const event = await createEventRepo({ name, description, category_id, organiser_id });

  const fullEvent = await findEventById(event.event_id);

  return fullEvent;
};

export const updateEventService = async (eventId, eventData, organiserId) => {
  const event = await findEventById(eventId, organiserId);
  if (!event) throw new AppError(NotFoundAppError);
  return updateEventRepo(eventId, eventData);
};


export const deleteEventService = async (eventId, organiserId) => {
  const event = await findEventById(eventId, organiserId);
  if (!event) throw new AppError(NotFoundAppError);
  const instances = await findInstancesByEventId(eventId);
  if (instances.length > 0) {
    throw new AppError(Messages.Event.DELETE_ERROR_DUE_ACTIVE_INSTANCE, StatusCodes.CONFLICT);
  }

  return deleteEventRepo(eventId);
};
