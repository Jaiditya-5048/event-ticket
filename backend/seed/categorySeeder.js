import db from '../models/index.js';

const { EventCategory } = db;
const categories = [
  { name: 'Music' },
  { name: 'Technology' },
  { name: 'Food' },
  { name: 'Art' },
];

const seedCategories = async () => {
  try {
    await db.sequelize.sync({ force: false });
    for (const category of categories) {
      await EventCategory.findOrCreate({
        where: { name: category.name },
        defaults: category,
      });
      console.log(`✅ Seeded category: ${category.name}`);
    }
    process.exit(0);
  } catch (err) {
    console.error('❌ Category seeding failed:', err);
    process.exit(1);
  }
};

seedCategories();
