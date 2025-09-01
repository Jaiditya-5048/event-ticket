import { StatusCodes } from 'http-status-codes';
import {
  getInstancesByEventIdService,
  getInstanceByIdService,
  getInstancesByCityService,
  createInstanceService,
  updateInstanceService,
  deleteInstanceService,
} from '../services/eventInstance.service.js';
import AppError from '../utils/AppError.js';
import { successResponse } from '../utils/responseHandler.js';
import Messages from '../utils/responseMessages.js';

///////////////////// General Event Services /////////////////////////
//helper const for not found error
const NotFoundAppError = new AppError(Messages.General.NOT_FOUND, StatusCodes.NOT_FOUND);

export const getInstancesByEventId = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const instances = await getInstancesByEventIdService(eventId);

    if (!instances.length) {
      return next(NotFoundAppError);
    }

    successResponse(res, Messages.General.FETCH_SUCCESS, instances, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

export const getInstanceById = async (req, res, next) => {
  try {
    const { instanceId } = req.params;

    const instance = await getInstanceByIdService(instanceId);

    if (!instance) {
      return next(NotFoundAppError);
    }
    successResponse(res, Messages.General.FETCH_SUCCESS, instance, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

export const getInstancesByCity = async (req, res, next) => {
  try {
    const { city } = req.query;

    const instances = await getInstancesByCityService(city?.trim());

    if (!instances.length) {
      return next(
        new AppError(NotFoundAppError)
      );
    }
    successResponse(res, Messages.General.FETCH_SUCCESS, instances, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};


///////////////////////// Organiser Event Services /////////////////////////

export const createInstance = async (req, res, next) => {
  try {
    const incident = await createInstanceService(req.body, req.user.user_id);
    successResponse(res, Messages.Event_instance.CREATED, incident, StatusCodes.CREATED);
  } catch (error) {
    next(error);
  }
}

export const updateInstance = async (req, res, next) => {
  try {

    const updated = await updateInstanceService(req.params.id, req.body);
    return successResponse(res, Messages.Event_instance.UPDATED, updated, StatusCodes.CREATED);
  } catch (err) {
    next(err);
  }
};

export const deleteInstance = async (req, res, next) => {
  try {
    const deleted = await deleteInstanceService(req.params.id);
    return successResponse(res, Messages.Event_instance.DELETED, deleted, StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};
