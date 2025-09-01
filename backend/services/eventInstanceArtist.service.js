import * as instanceArtistRepo from '../repositories/eventInstanceArtist.repository.js'

export const createEventInstanceArtist = (data) => instanceArtistRepo.createEventInstanceArtist(data);

export const deleteEventInstanceArtist = (instanceId, artistId) =>
  instanceArtistRepo.deleteEventInstanceArtist(instanceId, artistId);
