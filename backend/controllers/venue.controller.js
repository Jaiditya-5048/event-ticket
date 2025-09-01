import { StatusCodes } from 'http-status-codes';
import * as venueService from '../services/venue.service.js';
import AppError from '../utils/AppError.js';
import { successResponse } from '../utils/responseHandler.js';
import Messages from '../utils/responseMessages.js';

export const createVenue = async (req, res, next) => {
  try {
    const venue = await venueService.create(req.body);
    successResponse(res, Messages.Venue.CREATED, venue, StatusCodes.CREATED);
  } catch (err) {
    next(err);
  }
};

export const getAllVenues = async (req, res, next) => {
  try {
    const venues = await venueService.getAll();
    successResponse(res, Messages.General.FETCH_SUCCESS, venues, StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};

export const getVenueById = async (req, res, next) => {
  try {
    const venue = await venueService.getById(req.params.id);
    if (!venue) return next(AppError(Messages.General.NOT_FOUND, StatusCodes.NOT_FOUND));
    successResponse(res, Messages.General.FETCH_SUCCESS, venue, StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};

export const updateVenue = async (req, res, next) => {
  try {
    const [venue] = await venueService.update(req.params.id, req.body);
    if (!venue) return next(AppError(Messages.General.NOT_FOUND, StatusCodes.NOT_FOUND));
    successResponse(res, Messages.Venue.UPDATED, StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};

export const deleteVenue = async (req, res, next) => {
  try {
    const venue = await venueService.remove(req.params.id);
    if (!venue) return next(AppError(Messages.General.NOT_FOUND, StatusCodes.NOT_FOUND));
    successResponse(res, Messages.Venue.DELETED, StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};
