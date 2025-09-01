import db from '../models/index.js';

const { TicketType, EventInstance, Event } = db;

export const findTicketTypesByInstanceId = async (instanceId) => {
  return await TicketType.findAll({
    where: { instance_id: instanceId },
  });
};

export const findAndLockTicketType = async (ticket_type_id, transaction) => {
  return await db.TicketType.findOne({
    where: { ticket_type_id },
    lock: transaction.LOCK.UPDATE,
    transaction,
  });
};

export const updateTicketAvailability = async (ticketType, quantity, {transaction = null} = {}) => {
  ticketType.available_seats -= quantity;
  return await ticketType.save({ transaction });
};

//////////////////organiser functions////////////////////


export const createTicketType = async (data) => TicketType.create(data);

export const createBulkTicketType = async (data, { transaction = null } = {}) => {
  TicketType.bulkCreate(data, {
    transaction,
  });
};


export const getAllTicketTypes = async (id) => {
  console.log('user id repo', id);
  return await TicketType.findAll({
    include: {
      model: EventInstance,
      attributes: [], // this hides the EventInstance data from result
      required: true, // ensures only ticket types with instances are returned
      include: {
        model: Event,
        attributes: [], // this hides the Event data from result
        where: { organiser_id: id }, // filter here
        required: true, // ensures only instances belonging to the organiser are returned
      },
    },
    order: [['instance_id', 'ASC']],
  });
}; 

export const getTicketTypeById = (id) => TicketType.findByPk(id);

export const findByIdWithLock = async (id, transaction) => {
  return await db.TicketType.findOne({
    where: { ticket_type_id: id },
    transaction,
    lock: transaction.LOCK.UPDATE,
  });
};

export const saveTicketType = async (ticketType, transaction) => {
  return await ticketType.save({ transaction });
};

export const deleteTicketType = (id) =>
  TicketType.destroy({ where: { ticket_type_id: id } });

export const deleteTicketTypesByInstanceId = async (instance_id, transaction) => {
  return await db.TicketType.destroy({
    where: { instance_id },
    transaction,
  });
};
