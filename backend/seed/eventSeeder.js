import db from '../models/index.js';

const { Event } = db;

const eventsToSeed = [
  {
    name: 'Tech Conference 2025',
    description: 'A conference about the latest in tech.',
    organiser_id: 2,
    category_id: 2,
  },
  {
    name: 'Music Fest',
    description: 'Live performances from top bands.',
    organiser_id: 2,
    category_id: 1,
  },
  {
    name: 'Art Expo',
    description: 'Exhibition of modern and classical art.',
    organiser_id: 2,
    category_id: 4,
  },
  {
    name: 'Startup Pitch Day',
    description: 'Startups pitch to investors.',
    organiser_id: 2,
    category_id: 2,
  },
  {
    name: 'Food Carnival',
    description: 'Street food from around the world.',
    organiser_id: 2,
    category_id: 3,
  },
];

const seedEvents = async () => {
  try {
    await db.sequelize.sync({ force: false });
    console.log('✅ DB synced for event seeding');

    for (const event of eventsToSeed) {
      await Event.findOrCreate({
        where: { name: event.name },
        defaults: event,
      });
      console.log(`✅ Seeded event: ${event.name}`);
    }

    console.log('🌱 Event seeding completed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Event seeding failed:', error);
    process.exit(1);
  }
};

seedEvents();
