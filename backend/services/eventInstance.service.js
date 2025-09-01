// services/eventInstance.service.js
import dayjs from 'dayjs';
import {
  findInstancesByEventId,
  findInstanceById,
  findInstancesByCity,
  createInstanceRepo,
  updateInstanceRepo,
  deleteInstanceRepo,
} from '../repositories/eventInstance.repository.js';
import { findEventById } from '../repositories/event.repository.js';
import { getVenueById } from '../repositories/venue.repository.js';
import AppError from '../utils/AppError.js';
import { countTicketsWithInstanceId } from '../repositories/ticket.repository.js';
import { createBulkTicketType, createTicketType, deleteTicketTypesByInstanceId } from '../repositories/ticketType.repository.js';
import db from '../models/index.js';
import Messages from '../utils/responseMessages.js';
import { StatusCodes } from 'http-status-codes';
import { bulkCreateEventInstanceArtists, createEventInstanceArtist } from '../repositories/eventInstanceArtist.repository.js';
import { getArtistById } from '../repositories/artist.repository.js';

// funtion to format the response
// function formatInstance(instanceData) {
//   const { Artists, ...rest } = instanceData.toJSON ? instanceData.toJSON() : instanceData;

//   return {
//     ...rest,
//     artists: Artists?.map((a) => a.name) || [],
//   };
// }

// ways of using to format function
// export const getInstanceByIdService = async (id) => {
//   const instance = await findInstanceById(id);
//   return instance ? formatInstance(instance.toJSON()) : null;
// };

// export const getInstancesByEventIdService = async (eventId) => {
//   const instances = await findInstancesByEventId(eventId);
//   return instances.map((i) => formatInstance(i.toJSON()));
// };

//helper const for not found error
const NotFoundAppError = new AppError(Messages.General.NOT_FOUND, StatusCodes.NOT_FOUND);


export const getInstancesByEventIdService = async (eventId) => {
  const instances = await findInstancesByEventId(eventId);
  return instances;
};

export const getInstanceByIdService = async (id) => {
  const instance = await findInstanceById(id);
  return instance;
};

export const getInstancesByCityService = async (city) => {
  const instances = await findInstancesByCity(city);
  return instances;
};


///////////////////////////// Organiser Event Instance Services /////////////////////////


export const createInstanceService = async (instanceData, organiser_id) => {
  return await sequelize.transaction(async (transaction) => {
    // 1. Check event
    const event = await findEventById(instanceData.event_id, organiser_id);
    if (!event) throw new AppError(NotFoundAppError);

    // 2. Check venue
    const venue = await getVenueById(instanceData.venue_id);
    if (!venue) throw new AppError(NotFoundAppError);

    // 3. Create instance
    const instance = await createInstanceRepo(instanceData, { transaction });
    const instanceId = instance.instance_id;

    // 4. Add artists to instance
    const artistMappings = [];

    for (const artistId of instanceData.artist_ids) {
      const artist = await getArtistById(artistId);
      if (!artist) throw new AppError(NotFoundAppError);

      artistMappings.push({
        instance_id: instanceId,
        artist_id: artistId,
      });
    }
    await bulkCreateEventInstanceArtists(artistMappings, { transaction });

    // 5. Add ticket types (bulk insert preferred)
    const ticketData = instanceData.tickets.map((ticket) => ({
      ...ticket,
      instance_id: instanceId,
    }));

    await createBulkTicketType(ticketData, { transaction });

    // 6. Return full populated instance
    const fullInstance = await findInstanceById(instanceId, { transaction });
    return fullInstance;
  });
};


export const updateInstanceService = async (instance_id, data) => {
  const {venue_id , capacity} = data
  const instance = await findInstanceById(instance_id);
  if (!instance) {
    throw new AppError(NotFoundAppError);
  }  
  const updated = await updateInstanceRepo(instance_id, { venue_id, capacity });
   return updated;
}; 

export const deleteInstanceService = async (instance_id) => {
  const transaction = await db.sequelize.transaction();
  try {
    const instance = await findInstanceById(instance_id);
    if (!instance) {
      throw new AppError(NotFoundAppError);
    }
    console.log('instance_id', instance_id);

    const ticketCount = await countTicketsWithInstanceId(instance_id);
    console.log('ticketCount', ticketCount);
    
    if (ticketCount > 0) {
      throw new AppError(Messages.Event_instance.DELETE_ERROR_TCIEKTS_SOLD, StatusCodes.CONFLICT);
    }

    await deleteTicketTypesByInstanceId(instance_id, transaction);
    await deleteInstanceRepo(instance_id, transaction);

    await transaction.commit();
    return { message: Messages.Event_instance.DELETED };
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
};

