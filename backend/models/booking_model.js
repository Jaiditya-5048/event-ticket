export default (sequelize, DataTypes) => {
  const Booking = sequelize.define(
    'Booking',
    {
      booking_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      booking_date: { type: DataTypes.DATE, allowNull: false },
      total_price: { type: DataTypes.DECIMAL, allowNull: false },
      BookingStatus: { type: DataTypes.STRING, allowNull: false },
    },
    {
      tableName: 'Bookings',
      timestamps: true,
    }
  );
  return Booking;
};
