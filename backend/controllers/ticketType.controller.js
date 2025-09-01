import { getTicketTypesForInstance } from '../services/ticketType.service.js';
import { successResponse } from '../utils/responseHandler.js';
import AppError from '../utils/AppError.js';


export const getTicketTypesByInstance = async (req, res, next) => {
  try {
    const { instanceId } = req.params;
    const ticketTypes = await getTicketTypesForInstance(Number(instanceId));

    successResponse(res, Messages.General.FETCH_SUCCESS, ticketTypes, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};


///////////////////organiser functions////////////////////

import * as service from '../services/ticketType.service.js';
import Messages from '../utils/responseMessages.js';
import { StatusCodes } from 'http-status-codes';

export const getAllUnderOrganiser = async (req, res, next) => {
  try {
    const result = await service.getAll(req.user.user_id);
    successResponse(res, Messages.General.FETCH_SUCCESS, result, StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};


export const getById = async (req, res, next) => {
  try {
    const result = await service.getById(req.params.id);
    if (!result) return next(new AppError(Messages.General.NOT_FOUND, StatusCodes.NOT_FOUND));
    successResponse(res, Messages.General.FETCH_SUCCESS, result, StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};


export const create = async (req, res, next) => {
  try {
    const result = await service.create(req.body);
    successResponse(res, Messages.Ticket_types.CREATED, result, StatusCodes.CREATED);
  } catch (err) {
    next(err);
  }
};


export const update = async (req, res, next) => {
  try {
    const result = await service.update(req.params.id, req.body);
    successResponse(res, Messages.Ticket_types.UPDATED, result, StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};


export const remove = async (req, res, next) => {
  try {
    await service.remove(req.params.id);
    successResponse(res, Messages.Ticket_types.DELETED, null, StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};
