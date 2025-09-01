import { StatusCodes } from 'http-status-codes';
import * as artistService from '../services/artist.service.js';
import AppError from '../utils/AppError.js';
import { successResponse } from '../utils/responseHandler.js';
import Messages from '../utils/responseMessages.js';

export const createArtist = async (req, res, next) => {
  try {    
    const artist = await artistService.create(req.body);
    successResponse(res, Messages.Artist.CREATED, artist, StatusCodes.CREATED);
  } catch (err) {
    next(err);
  }
};

export const getAllArtists = async (req, res, next) => {
  try {
    const artists = await artistService.getAll();
    successResponse(res, Messages.General.FETCH_SUCCESS, artists, StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};

export const getArtistById = async (req, res, next) => {
  try {
    const artist = await artistService.getById(req.params.id);
    if (!artist) return next(new AppError(Messages.General.NOT_FOUND, StatusCodes.NOT_FOUND));
    successResponse(res, Messages.General.FETCH_SUCCESS, artist, StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};

export const updateArtist = async (req, res, next) => {
  try {
    const [artist] = await artistService.update(req.params.id, req.body);
    if (!artist) return next(new AppError(Messages.General.NOT_FOUND, StatusCodes.NOT_FOUND));
    successResponse(res, Messages.Artist.UPDATED, artist, StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};

export const deleteArtist = async (req, res, next) => {
  try {
    const artist = await artistService.remove(req.params.id);
    if (!artist) return next(new AppError(Messages.General.NOT_FOUND, StatusCodes.NOT_FOUND));
    successResponse(res, Messages.Artist.DELETED, null, StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};
