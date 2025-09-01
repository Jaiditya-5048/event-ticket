// models/event_instance_artist_model.js
const EventInstanceArtistModel = (sequelize, DataTypes) => {
  return sequelize.define(
    'EventInstanceArtist',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      instance_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      artist_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'EventInstanceArtists',
      timestamps: true,
    }
  );
};

export default EventInstanceArtistModel;
