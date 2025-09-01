import Joi from 'joi'

export const addArtistSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  bio: Joi.string().min(10).max(500).required(),
});

export const updateArtistSchema = Joi.object({
  name: Joi.string().min(2).max(100).optional(),
  bio: Joi.string().min(10).max(500).optional(),
}).min(1);

export const createVenueSchema = Joi.object({
  name: Joi.string().max(100).required(),
  address: Joi.string().required().max(500),
  city: Joi.string().max(50).required(),
});

export const updateVenueSchema = Joi.object({
  name: Joi.string().max(100),
  address: Joi.string().max(500),
  city: Joi.string().max(50),
}).min(1);

export const createTicketTypeSchema = Joi.object({
  instance_id: Joi.number().integer().required(),
  name: Joi.string().max(50).required(),
  price: Joi.number().precision(2).required(),
  total_seats: Joi.number().integer().required(),
});

export const updateTicketTypeSchema = Joi.object({
  name: Joi.string().max(50).optional(),
  price: Joi.number().precision(2).optional(),
  total_seats: Joi.number().integer().optional(),
}).min(1);

export const createEventSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(10).max(500).required(),
  category_id: Joi.number().integer().required(),
});

export const updateEventSchema = Joi.object({
  name: Joi.string().min(2).max(100).optional(),
  description: Joi.string().min(10).max(500).optional(),
  category_id: Joi.number().integer().optional(),
}).min(1);

export const createInstanceArtistSchema = Joi.object({
  instance_id: Joi.number().integer().required(),
  artist_id: Joi.number().integer().required(),
}).options({ allowUnknown: false });;

export const updateInstanceArtistSchema = Joi.object({
  venue_id: Joi.number().optional(),
  capacity: Joi.number().optional(),
}).min(1).options({ allowUnknown: false });

