import { StatusCodes } from 'http-status-codes';
import * as artistRepo from '../repositories/artist.repository.js';
import { findEventInstanceArtistByArtistId } from '../repositories/eventInstanceArtist.repository.js';
import AppError from '../utils/AppError.js';
import Messages from '../utils/responseMessages.js';

export const create = (data) => artistRepo.createArtist(data);
export const getAll = () => artistRepo.getAllArtists();
export const getById = (id) => artistRepo.getArtistById(id);

export const update = (id, data) => artistRepo.updateArtistById(id, data);

export const remove = async (id) => {
  const eventInstanceArtist = await findEventInstanceArtistByArtistId(id);
  console.log(eventInstanceArtist);
  if (eventInstanceArtist) {
    throw new AppError(Messages.Artist.DELETE_ERROR_DUE_ACTIVE_INSTANCE, StatusCodes.CONFLICT);
  }
  return artistRepo.deleteArtistById(id)
};
