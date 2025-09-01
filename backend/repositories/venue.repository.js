import db from '../models/index.js';
const Venue = db.Venue;

export const createVenue = async (data) => Venue.create(data);
export const getAllVenues = async () => Venue.findAll();
export const getVenueById = async (id) => Venue.findByPk(id);
export const updateVenueById = async (id, data) =>
  Venue.update(data, { where: { venue_id: id } });
export const deleteVenueById = async (id) =>
  Venue.destroy({ where: { venue_id: id } });
