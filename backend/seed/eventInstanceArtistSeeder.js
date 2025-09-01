import db from '../models/index.js';

const { EventInstanceArtist } = db;
const mappings = [
  { instance_id: 2, artist_id: 2 },
  { instance_id: 3, artist_id: 3 },
  { instance_id: 4, artist_id: 1 },
  { instance_id: 5, artist_id: 2 },
  { instance_id: 6, artist_id: 3 },
  { instance_id: 1, artist_id: 1 },
  { instance_id: 7, artist_id: 1 },
  { instance_id: 8, artist_id: 2 },
  { instance_id: 9, artist_id: 3 },
  { instance_id: 10, artist_id: 1 },
  { instance_id: 11, artist_id: 2 },
  { instance_id: 12, artist_id: 3 },
  { instance_id: 13, artist_id: 1 },
  { instance_id: 14, artist_id: 2 },
  { instance_id: 15, artist_id: 3 },
  { instance_id: 16, artist_id: 1 },
  { instance_id: 17, artist_id: 2 },
  { instance_id: 18, artist_id: 3 },
  { instance_id: 19, artist_id: 1 },
  { instance_id: 20, artist_id: 2 },
  { instance_id: 21, artist_id: 3 },
];

const seedEventInstanceArtists = async () => {
  try {
    await db.sequelize.sync({ force: false });
    for (const map of mappings) {
      await EventInstanceArtist.create(map);
      console.log(
        `✅ Linked Artist ${map.artist_id} with Instance ${map.event_instance_id}`
      );
    }
    process.exit(0);
  } catch (err) {
    console.error('❌ EventInstanceArtist seeding failed:', err);
    process.exit(1);
  }
};

seedEventInstanceArtists();
