export default (sequelize, DataTypes) => {
  const Venue = sequelize.define(
    'Venue',
    {
      venue_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: DataTypes.STRING(100), allowNull: false },
      address: { type: DataTypes.TEXT, allowNull: false },
      city: { type: DataTypes.STRING(50), allowNull: false },
    },
    {
      paranoid: true,
      tableName: 'Venues',
      timestamps: true,
    }
  );
  return Venue;
};
