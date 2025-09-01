export default (sequelize, DataTypes) => {
  const TicketType = sequelize.define(
    'TicketType',
    {
      ticket_type_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      instance_id: { type: DataTypes.INTEGER, allowNull: false },
      name: { type: DataTypes.STRING(50), allowNull: false },
      price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      total_seats: { type: DataTypes.INTEGER, allowNull: false },
      available_seats: { type: DataTypes.INTEGER },
    },
    {
      tableName: 'TicketTypes',
      timestamps: true,
      hooks: {
        beforeCreate: (ticketType) => {
          if (
            ticketType.available_seats === undefined ||
            ticketType.available_seats === null
          ) {
            ticketType.available_seats = ticketType.total_seats;
          }
        },
      },
    }
  );

  return TicketType;
};
