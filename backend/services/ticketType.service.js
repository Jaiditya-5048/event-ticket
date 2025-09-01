import { findInstanceById } from '../repositories/eventInstance.repository.js';
import { countTicketsWithTicketTypeId } from '../repositories/ticket.repository.js';
import { findTicketTypesByInstanceId } from '../repositories/ticketType.repository.js';
import db from '../models/index.js';

export const getTicketTypesForInstance = async (instanceId) => {
  const ticketTypes = await findTicketTypesByInstanceId(instanceId);
  return ticketTypes;
};

/////////////////organiser functions////////////////////

import * as repo from '../repositories/ticketType.repository.js';
import AppError from '../utils/AppError.js';
import Messages from '../utils/responseMessages.js';
import { StatusCodes } from 'http-status-codes';

export const create = async (data) => {
  const instance = await findInstanceById(data.instance_id);
  if (!instance) {
    throw new AppError(Messages.General.NOT_FOUND, StatusCodes.NOT_FOUND);
  }
  await repo.createTicketType(data);
}

export const getAll = async (id) => {
  console.log('user id', id);
  const ticketTypes = await repo.getAllTicketTypes(id);
  

  // Grouping
  const grouped = ticketTypes.reduce((acc, ticket) => {
    const key = ticket.instance_id;
    if (!acc[key]) acc[key] = [];
    acc[key].push(ticket);
    return acc;
  }, {});

  // Sorting tickets in each group + sorting groups by instance_id
  const result = Object.entries(grouped)
    .map(([instance_id, tickets]) => ({
      instance_id: Number(instance_id),
      tickets: tickets.sort((a, b) => a.price - b.price),
    }))
    .sort((a, b) => a.instance_id - b.instance_id); // ascending

  return result;
};

export const getById = async (id) => await repo.getTicketTypeById(id);

export const update = async (id, data) => {
  const transaction = await db.sequelize.transaction();

  try {
    const ticketType = await repo.findByIdWithLock(id, transaction);
    if (!ticketType) throw new Error(Messages.General.NOT_FOUND, StatusCodes.NOT_FOUND);

    if ('available_seats' in data) {
      throw new AppError(Messages.Ticket_types.UPDATE_NOT_ALLOWED, StatusCodes.BAD_REQUEST);
    }

    // Handle total_seats logic
    if ('total_seats' in data) {
      const oldTotal = ticketType.total_seats;
      const newTotal = data.total_seats;

      if (newTotal > data.available_seats) {
        throw new AppError(Messages.Ticket_types.UPDATE_TOTAL_SEATS_ERROR, StatusCodes.BAD_REQUEST);
      }

      const addedSeats = newTotal - oldTotal;
      ticketType.available_seats += addedSeats;
      ticketType.total_seats = newTotal;
    }

    // Other updates
    ['name', 'price'].forEach((key) => {
      if (data[key] !== undefined) {
        ticketType[key] = data[key];
      }
    });

    const updated = await repo.saveTicketType(ticketType, transaction);
    await transaction.commit();
    return updated;
  } catch (err) {
    await transaction.rollback();
    throw new AppError(err.message || Messages.Ticket_types.UPDATED_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

export const remove = async (id) => {
  const existingTickets = await countTicketsWithTicketTypeId(id);

  if (existingTickets > 0) {
    throw new Error(Messages.Ticket_types.DELETED_ERROR, StatusCodes.CONFLICT);
  }

  // Proceed to delete if no dependent tickets found
  return await repo.deleteTicketType(id);
};
