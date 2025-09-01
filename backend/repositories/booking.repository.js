import db from '../models/index.js';

const { Booking, Ticket, EventInstance, Venue, Event } = db;

export const createNewBookingEntry = async (bookingData, transaction) => {
  return await Booking.create(bookingData, { transaction });
};

// repositories/booking.repository.ts
export const getBookingsByUserId = async (user_id) => {
  return await Booking.findAll({
    where: { user_id },
    attributes: ['booking_id', 'booking_date', 'BookingStatus'],
    include: [
      {
        model: Ticket,
        attributes: ['ticket_id', 'instance_id', 'seat_number'],
        include: [
          {
            model: EventInstance,
            attributes: ['date_time'],
            include: [
              {
                model: Event,
                attributes: ['name'],
              },
              {
                model: Venue,
                attributes: ['name', 'city'],
              },
            ],
          },
        ],
      },
    ],
    order: [['booking_date', 'DESC']],
  });
};

