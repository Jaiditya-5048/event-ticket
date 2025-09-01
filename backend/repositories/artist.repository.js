import { where } from 'sequelize';
import db from '../models/index.js';
const Artist = db.Artist;

export const createArtist = async (data) => Artist.create(data);
export const getAllArtists = async () => Artist.findAll();
export const getArtistById = async (id) => Artist.findByPk(id);

export const updateArtistById = async (id, data) =>
  Artist.update(data, { where: { artist_id: id } });

export const deleteArtistById = async (id) =>
  Artist.destroy({ where: { artist_id: id } });
