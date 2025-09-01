import { StatusCodes } from 'http-status-codes';
import * as instanceArtistsService from '../services/eventInstanceArtist.service.js';
import AppError from '../utils/AppError.js';
import { successResponse } from '../utils/responseHandler.js';
import Messages from '../utils/responseMessages.js';

export const createInstanceArtist = async (req, res, next) => {
  try {    
    const artist = await instanceArtistsService.createEventInstanceArtist(req.body);
    successResponse(res, Messages.Artist.CREATED, artist, StatusCodes.CREATED);
  } catch (err) {
    next(err);
  }
};

export const deleteInstanceArtist = async (req, res, next) => {
  try {
    const { instance_id, artist_id } = req.query;

    if (!instance_id || !artist_id) {
      return next(new AppError(Messages.Instance_Artist.DELETE_MISSING_FIELD_ERROR, StatusCodes.BAD_REQUEST));
    }

    const artist = await instanceArtistsService.deleteEventInstanceArtist(
      parseInt(instance_id, 10),
      parseInt(artist_id, 10)
    );

    successResponse(res, Messages.Instance_Artist.DELETED, artist, StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};
