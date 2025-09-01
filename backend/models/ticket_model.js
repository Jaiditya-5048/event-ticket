export default (sequelize, DataTypes) => {
  const Ticket = sequelize.define(
    'Ticket',
    {
      ticket_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      booking_id: { type: DataTypes.INTEGER, allowNull: false },
      instance_id: { type: DataTypes.INTEGER, allowNull: false },
      ticket_type_id: { type: DataTypes.INTEGER, allowNull: false },
      seat_number: { type: DataTypes.STRING(10) },
    },
    {
      tableName: 'Tickets',
      timestamps: true,
    }
  );
  return Ticket;
};
