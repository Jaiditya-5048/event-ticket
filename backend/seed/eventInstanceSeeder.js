import db from '../models/index.js';
import dayjs from 'dayjs';

const { EventInstance } = db;

const instancesToSeed = [
  // Event 1: 3 instances
  {
    event_id: 1,
    venue_id: 1,
    date_time: dayjs().add(1, 'day').toDate(),
    capacity: 100,
    artist_id: 1,
  },
  {
    event_id: 1,
    venue_id: 2,
    date_time: dayjs().add(2, 'day').toDate(),
    capacity: 120,
    artist_id: 2,
  },
  {
    event_id: 1,
    venue_id: 3,
    date_time: dayjs().add(3, 'day').toDate(),
    capacity: 80,
    artist_id: 3,
  },

  // Event 2: 1 instance
  {
    event_id: 2,
    venue_id: 2,
    date_time: dayjs().add(4, 'day').toDate(),
    capacity: 150,
    artist_id: 1,
  },

  // Event 3: 5 instances
  {
    event_id: 3,
    venue_id: 3,
    date_time: dayjs().add(5, 'day').toDate(),
    capacity: 90,
    artist_id: 2,
  },
  {
    event_id: 3,
    venue_id: 4,
    date_time: dayjs().add(6, 'day').toDate(),
    capacity: 110,
    artist_id: 3,
  },
  {
    event_id: 3,
    venue_id: 5,
    date_time: dayjs().add(7, 'day').toDate(),
    capacity: 100,
    artist_id: 1,
  },
  {
    event_id: 3,
    venue_id: 1,
    date_time: dayjs().add(8, 'day').toDate(),
    capacity: 95,
    artist_id: 2,
  },
  {
    event_id: 3,
    venue_id: 2,
    date_time: dayjs().add(9, 'day').toDate(),
    capacity: 105,
    artist_id: 3,
  },

  // Event 4: 2 instances
  {
    event_id: 4,
    venue_id: 4,
    date_time: dayjs().add(10, 'day').toDate(),
    capacity: 130,
    artist_id: 1,
  },
  {
    event_id: 4,
    venue_id: 1,
    date_time: dayjs().add(11, 'day').toDate(),
    capacity: 140,
    artist_id: 2,
  },

  // Event 5: 10 instances
  {
    event_id: 5,
    venue_id: 5,
    date_time: dayjs().add(12, 'day').toDate(),
    capacity: 160,
    artist_id: 3,
  },
  {
    event_id: 5,
    venue_id: 4,
    date_time: dayjs().add(13, 'day').toDate(),
    capacity: 170,
    artist_id: 1,
  },
  {
    event_id: 5,
    venue_id: 3,
    date_time: dayjs().add(14, 'day').toDate(),
    capacity: 150,
    artist_id: 2,
  },
  {
    event_id: 5,
    venue_id: 2,
    date_time: dayjs().add(15, 'day').toDate(),
    capacity: 180,
    artist_id: 3,
  },
  {
    event_id: 5,
    venue_id: 1,
    date_time: dayjs().add(16, 'day').toDate(),
    capacity: 190,
    artist_id: 1,
  },
  {
    event_id: 5,
    venue_id: 2,
    date_time: dayjs().add(17, 'day').toDate(),
    capacity: 160,
    artist_id: 2,
  },
  {
    event_id: 5,
    venue_id: 3,
    date_time: dayjs().add(18, 'day').toDate(),
    capacity: 165,
    artist_id: 3,
  },
  {
    event_id: 5,
    venue_id: 4,
    date_time: dayjs().add(19, 'day').toDate(),
    capacity: 175,
    artist_id: 1,
  },
  {
    event_id: 5,
    venue_id: 5,
    date_time: dayjs().add(20, 'day').toDate(),
    capacity: 155,
    artist_id: 2,
  },
  {
    event_id: 5,
    venue_id: 1,
    date_time: dayjs().add(21, 'day').toDate(),
    capacity: 145,
    artist_id: 3,
  },
];

const seedEventInstances = async () => {
  try {
    await db.sequelize.sync({ force: false }); // Ensure tables exist
    console.log('✅ DB synced for EventInstance seeding');

    for (const instance of instancesToSeed) {
      await EventInstance.create(instance);
      console.log(
        `✅ Seeded instance for Event ID ${instance.event_id} at Venue ID ${instance.venue_id}`
      );
    }

    console.log('🌱 EventInstance seeding completed');
    process.exit(0);
  } catch (error) {
    console.error('❌ EventInstance seeding failed:', error);
    process.exit(1);
  }
};

seedEventInstances();
