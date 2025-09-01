import db from '../models/index.js';

const { Venue } = db;

const venuesToSeed = [
  { name: 'City Hall', address: '123 Main St', city: 'Delhi' },
  { name: 'Open Air Theatre', address: '456 Park Lane', city: 'Mumbai' },
  { name: 'Tech Auditorium', address: '789 Tech Road', city: 'Bangalore' },
  { name: 'Art Gallery', address: '321 Art St', city: 'Chennai' },
  { name: 'Convention Center', address: '654 Grand Ave', city: 'Hyderabad' },
];

const seedVenues = async () => {
  try {
    await db.sequelize.sync({ force: false });
    console.log('✅ DB synced for venue seeding');

    for (const venue of venuesToSeed) {
      await Venue.findOrCreate({
        where: { name: venue.name },
        defaults: venue,
      });
      console.log(`✅ Seeded venue: ${venue.name}`);
    }

    console.log('🌱 Venue seeding completed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Venue seeding failed:', error);
    process.exit(1);
  }
};

seedVenues();
