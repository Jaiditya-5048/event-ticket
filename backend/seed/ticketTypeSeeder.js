import db from '../models/index.js';

const { TicketType } = db;

const seedTicketTypes = async () => {
  try {
    await db.sequelize.sync({ force: false });
    console.log('✅ DB synced for TicketType seeding');

    const ticketTypes = [];

    for (let instanceId = 1; instanceId <= 21; instanceId++) {
      ticketTypes.push(
        {
          instance_id: instanceId,
          name: 'General Admission',
          price: 499.99,
          total_seats: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          instance_id: instanceId,
          name: 'VIP',
          price: 999.99,
          total_seats: 25,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      );
    }

    await TicketType.bulkCreate(ticketTypes, { individualHooks: true });
    console.log('🌱 TicketType seeding completed');
    process.exit(0);
  } catch (error) {
    console.error('❌ TicketType seeding failed:', error);
    process.exit(1);
  }
};

seedTicketTypes();
