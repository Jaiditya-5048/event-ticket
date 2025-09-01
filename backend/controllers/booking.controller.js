import { StatusCodes } from 'http-status-codes';
import { createNewBooking, getBookingInfoByUser } from '../services/booking.service.js';
import { successResponse } from '../utils/responseHandler.js';
import Messages from '../utils/responseMessages.js';

// To create a new user booking
export const createBooking = async (req, res, next) => {
  try {
    const user_id = req.user.user_id;
    const instance_id = parseInt(req.params.instanceId, 10);

    const data = {
      user_id,
      instance_id,
      ticket_type_id: req.body.ticket_type_id,
      quantity: req.body.quantity,
      seat_numbers: req.body.seat_numbers || [],
    };

    const booking = await createNewBooking(data);
    successResponse(res, Messages.Booking.CREATED, booking, StatusCodes.CREATED);
  } catch (error) {
    next(error);
  }
};

//To get all bookings of a user
export const getUserBookings = async (req, res, next) => {
  try {
    const user_id = req.user.user_id;
    const bookings = await getBookingInfoByUser(user_id);
    successResponse(res, Messages.General.FETCH_SUCCESS, bookings, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};