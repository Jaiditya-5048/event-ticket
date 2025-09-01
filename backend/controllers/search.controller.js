import { searchService } from '../services/search.service.js';
import { successResponse } from '../utils/responseHandler.js';
import AppError from '../utils/AppError.js';
import Messages from '../utils/responseMessages.js';
import { StatusCodes } from 'http-status-codes';

export const searchController = async (req, res, next) => {
  try {
    const { q, category } = req.query;

    if (!q || q.trim() === '') {
      return next(new AppError(Messages.Search.QUERY_REQUIERED_ERROR, StatusCodes.BAD_REQUEST));
    }

    const results = await searchService({ q, category });

    return successResponse(res, Messages.Search.SEARCH_COMPLETED, results, StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};
