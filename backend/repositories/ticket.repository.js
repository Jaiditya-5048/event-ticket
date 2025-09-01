import db from '../models/index.js';

const { Ticket } = db;



export const bulkCreateTicket = async (tickets, transaction) => {
  return await Ticket.bulkCreate(tickets, { transaction });
};

export const countTicketsWithTicketTypeId = async (id) => {
  return await Ticket.count({
    where: { ticket_type_id: id },
  });
};

export const countTicketsWithInstanceId = async (id) => {
  return await Ticket.count({
    where: { instance_id: id },
  });
};
