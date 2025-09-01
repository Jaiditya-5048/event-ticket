import { getEventTicketsServiceOrganiser } from '../services/ticket.service.js';
import AppError from '../utils/AppError.js';
import Messages from '../utils/responseMessages.js';

export const getEventTicketsOrganiser = async (req, res, next) => {
  try {
    const tickets = await getEventTicketsServiceOrganiser(
      req.params.id,
      req.user.user_id
    );

    if (!tickets) {
      return next(
        new AppError(Messages.General.NOT_FOUND, )
      );
    }

    res.json(tickets);
  } catch (err) {
    next(err);
  }
};
