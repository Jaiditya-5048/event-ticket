import { StatusCodes } from 'http-status-codes';
import db from '../models/index.js';
import { createNewBookingEntry, getBookingsByUserId } from '../repositories/booking.repository.js';
import { bulkCreateTicket } from '../repositories/ticket.repository.js';
import {
  findAndLockTicketType,
  updateTicketAvailability
} from '../repositories/ticketType.repository.js';
import Messages from '../utils/responseMessages.js';
import AppError from '../utils/AppError.js';


const { TicketType } = db;

// Function to create a new User booking
export const createNewBooking = async (data) => {
  const { ticket_type_id, quantity, seat_numbers, user_id, instance_id } = data;
  const booking_date = new Date();

  const t = await db.sequelize.transaction();

  try {
    const ticketType = await findAndLockTicketType(ticket_type_id, t);
    if (!ticketType) throw new AppError(Messages.General.NOT_FOUND, StatusCodes.NOT_FOUND);
    if (ticketType.available_seats < quantity) throw new AppError(Messages.Booking.SEATS_AVAILABILITY_ERROR, StatusCodes.CONFLICT);

    await updateTicketAvailability(ticketType, quantity, {transaction: t});

    const total_price = parseFloat(
      (parseFloat(ticketType.price) * quantity).toFixed(2)
    );

    const booking = await createNewBookingEntry(
      {
        user_id,
        booking_date,
        total_price,
        BookingStatus: 'CONFIRMED',
      },
      t
    );

    let ticketData = [];

    if (Array.isArray(seat_numbers) && seat_numbers.length > 0) {
      if (seat_numbers.length !== quantity) {
        throw new AppError(Messages.Booking.SEAT_NUMBER_ERROR, StatusCodes.CONFLICT);
      }

      ticketData = seat_numbers.map((seat) => ({
        booking_id: booking.booking_id,
        instance_id,
        ticket_type_id,
        seat_number: seat,
      }));
    } else {
      ticketData = Array.from({ length: quantity }, () => ({
        booking_id: booking.booking_id,
        instance_id,
        ticket_type_id,
        seat_number: null,
      }));
    }

    await bulkCreateTicket(ticketData, t);
    await t.commit();

    return booking;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

// services/booking.service.ts
export const getBookingInfoByUser = async (user_id) => {
  const bookings = await getBookingsByUserId(user_id);

  return bookings.map((booking) => {
    const tickets = booking.Tickets || [];
    const firstTicket = tickets[0];
    const eventInstance = firstTicket?.EventInstance;
    const event = eventInstance?.Event;
    const venue = eventInstance?.Venue;

    return {
      booking_id: booking.booking_id,
      event_name: event ? event.name : 'Unknown Event',
      time: eventInstance?.date_time,
      venue: venue ? `${venue.name}, ${venue.city}` : null,
      status: booking.BookingStatus,
      quantity: tickets.length,
    };
  });
};