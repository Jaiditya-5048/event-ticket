import { StatusCodes } from 'http-status-codes';
import {
  createEventService,
  getOrganiserEventByIdSerivce,
  getOrganiserEventsService,
  getPublicAllEvents,
  getPublicEventById,
  updateEventService,
  deleteEventService,
} from '../services/event.service.js';
import AppError from '../utils/AppError.js';
import { successResponse } from '../utils/responseHandler.js';
import Messages from '../utils/responseMessages.js';

///////////////////////// General Event Controllers /////////////////////////

// Helper const for not found error
const NotFoundAppError = new AppError(Messages.General.NOT_FOUND, StatusCodes.NOT_FOUND);


export const getEventById = async (req, res, next) => {
  try {
    const event = await getPublicEventById(req.params.id);
    if (!event) return next(NotFoundAppError);
    successResponse(res, Messages.General.FETCH_SUCCESS, event, StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};

export const getAllEvents = async (_req, res, next) => {
  try {
    const events = await getPublicAllEvents();
    successResponse(res, Messages.General.FETCH_SUCCESS, events, StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};



///////////////////////// Organiser Event Controllers /////////////////////////

export const getEventsByOrganiser = async (req, res, next) => {
  try {
    const events = await getOrganiserEventsService(req.user.id);
    return successResponse(res, Messages.General.FETCH_SUCCESS, events, StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};

export const getOrganiserEventById = async (req, res, next) => {
  try {
    const event = await getOrganiserEventByIdSerivce(req.params.id, req.user.id);
    return successResponse(res, Messages.General.FETCH_SUCCESS, event, StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};

export const createEvent = async (req, res, next) => {
  try {    
    const event = await createEventService(req.body, req.user.user_id);
    return successResponse(res, Messages.Event.CREATED, event, StatusCodes.CREATED);
  } catch (err) {
    next(err);
  }
};

export const updateEvent = async (req, res, next) => {
  try {
    const updated = await updateEventService(req.params.id, req.body, req.user.user_id);
    return successResponse(res, Messages.Event.UPDATED, updated, StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};

export const deleteEvent = async (req, res, next) => {
  try {
    const deleted = await deleteEventService(req.params.id, req.user.user_id);
    return successResponse(res, Messages.Event.DELETED, deleted, StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};


