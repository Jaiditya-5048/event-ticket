import db from '../models/index.js';

const { Artist } = db;
const artists = [
  { name: 'Arijit Singh', bio: 'Playback singer and music composer' },
  { name: 'Shreya Ghoshal', bio: 'Renowned Indian playback singer' },
  { name: 'A.R. Rahman', bio: 'Oscar-winning composer and singer' },
];

const seedArtists = async () => {
  try {
    await db.sequelize.sync({ force: false });
    for (const artist of artists) {
      await Artist.findOrCreate({
        where: { name: artist.name },
        defaults: artist,
      });
      console.log(`✅ Seeded artist: ${artist.name}`);
    }
    process.exit(0);
  } catch (err) {
    console.error('❌ Artist seeding failed:', err);
    process.exit(1);
  }
};

seedArtists();
