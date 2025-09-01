import Sequelize from 'sequelize';
import sequelize from '../config/database.js';
import VenueModel from './venue_model.js';
import TicketTypeModel from './ticket_type_model.js';
import BookingModel from './booking_model.js';
import TicketModel from './ticket_model.js';
import UserModel from './user_model.js';
import EventModel from './event_model.js';
import EventInstanceModel from './event_instance_model.js';
import EventInstanceArtistModel from './eventInstanceArtist_Model.js';
import EventCategoryModel from './eventCategory_model.js';
import ArtistModel from './artist_model.js';

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = UserModel(sequelize, Sequelize.DataTypes);
db.Event = EventModel(sequelize, Sequelize.DataTypes);
db.EventInstance = EventInstanceModel(sequelize, Sequelize.DataTypes);
db.Venue = VenueModel(sequelize, Sequelize.DataTypes);
db.TicketType = TicketTypeModel(sequelize, Sequelize.DataTypes);
db.Booking = BookingModel(sequelize, Sequelize.DataTypes);
db.Ticket = TicketModel(sequelize, Sequelize.DataTypes);
db.Artist = ArtistModel(sequelize, Sequelize.DataTypes);
db.EventInstanceArtist = EventInstanceArtistModel(
  sequelize,
  Sequelize.DataTypes
);
db.EventCategory = EventCategoryModel(sequelize, Sequelize.DataTypes);

// Associations
const {
  User,
  Event,
  EventInstance,
  Venue,
  TicketType,
  Booking,
  Ticket,
  Artist,
  EventInstanceArtist,
  EventCategory,
} = db;
// Add this line to associate Event with User as 'organiser'
User.hasMany(Event, { foreignKey: 'organiser_id', as: 'events' });
Event.belongsTo(User, { foreignKey: 'organiser_id', as: 'organiser' });

User.hasMany(Booking, { foreignKey: 'user_id' });
Booking.belongsTo(User, { foreignKey: 'user_id' });

Event.hasMany(EventInstance, { foreignKey: 'event_id' });
EventInstance.belongsTo(Event, { foreignKey: 'event_id' });

Venue.hasMany(EventInstance, { foreignKey: 'venue_id' });
EventInstance.belongsTo(Venue, { foreignKey: 'venue_id' });

EventInstance.hasMany(TicketType, { foreignKey: 'instance_id' });
TicketType.belongsTo(EventInstance, { foreignKey: 'instance_id' });

Booking.hasMany(Ticket, { foreignKey: 'booking_id' });
Ticket.belongsTo(Booking, { foreignKey: 'booking_id' });

TicketType.hasMany(Ticket, { foreignKey: 'ticket_type_id' });
Ticket.belongsTo(TicketType, { foreignKey: 'ticket_type_id' });

EventInstance.hasMany(Ticket, { foreignKey: 'instance_id' });
Ticket.belongsTo(EventInstance, { foreignKey: 'instance_id' });

// One event has one category
EventCategory.hasMany(Event, { foreignKey: 'category_id' });
Event.belongsTo(EventCategory, { foreignKey: 'category_id', as: 'Category' });

// Many-to-many between EventInstance and Artist
EventInstance.belongsToMany(Artist, {
  through: EventInstanceArtist,
  foreignKey: 'instance_id',
  otherKey: 'artist_id',
});
Artist.belongsToMany(EventInstance, {
  through: EventInstanceArtist,
  foreignKey: 'artist_id',
  otherKey: 'instance_id',
});

// Sync all models with DB; use { force: true } to drop and recreate tables (use cautiously in production)
// sequelize.sync({ force: true });

export default db;
