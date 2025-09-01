import db from '../models/index.js';
const EventInstanceArtist = db.EventInstanceArtist;


export const createEventInstanceArtist = async (data, { transaction = null } = {}) => EventInstanceArtist.create(data, { transaction });

export const bulkCreateEventInstanceArtists = async (data, {transaction = null} = {}) => {
  return EventInstanceArtist.bulkCreate(data, {
    transaction,
  })
}

export const findEventInstanceArtistByArtistId = async (artistId) => {
  return EventInstanceArtist.findOne({
    where: { artist_id: artistId },
  });
}

export const deleteEventInstanceArtist = async (instanceId, artistId) =>
  EventInstanceArtist.destroy({
    where: {
      instance_id: instanceId,
      artist_id: artistId,
    },
  });
