import { StatusCodes } from 'http-status-codes';
import { findInstancesByVenueId } from '../repositories/eventInstance.repository.js';
import * as venueRepo from '../repositories/venue.repository.js';
import Messages from '../utils/responseMessages.js';

export const create = (data) => venueRepo.createVenue(data);
export const getAll = () => venueRepo.getAllVenues();
export const getById = (id) => venueRepo.getVenueById(id);
export const update = (id, data) => venueRepo.updateVenueById(id, data);
export const remove = async (id) => {
  const instance = await findInstancesByVenueId(id);  
  if (instance) {
    throw new Error(Messages.Venue.DELETE_NOT_ALLOWED, StatusCodes.CONFLICT);
  }
  return venueRepo.deleteVenueById(id)
};
