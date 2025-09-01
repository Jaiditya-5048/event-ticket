import db from '../models/index.js';

const { User } = db;

const seedUsers = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('✅ DB connected for seeding');

    // Ensure tables are created (force: true drops & recreates, alter: true modifies safely)
    // await db.sequelize.sync({ alter: true }); // or use { alter: true } if you don't want to drop data

    const usersToSeed = [
      {
        name: 'John Doe',
        email: 'user@example.com',
        password: 'password123', // Will be hashed by model hook
        phone: '1234567890',
        role: 'user',
      },
      {
        name: 'Jane Smith',
        email: 'organiser@example.com',
        password: 'password123',
        phone: '9876543210',
        role: 'organiser',
      },
    ];

    for (const user of usersToSeed) {
      const existingUser = await User.findOne({ where: { email: user.email } });
      if (!existingUser) {
        await User.create(user); // Triggers `beforeCreate` hook to hash password
        console.log(`✅ Created user: ${user.email}`);
      } else {
        console.log(`⚠️ User already exists: ${user.email}`);
      }
    }

    console.log('🌱 Seeding completed');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
};

seedUsers();
