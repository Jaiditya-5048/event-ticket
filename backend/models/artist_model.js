// models/artist_model.js
const ArtistModel = (sequelize, DataTypes) => {
  return sequelize.define(
    'Artist',
    {
      artist_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      bio: {
        type: DataTypes.TEXT,
      },
    },
    {
      paranoid: true,
      tableName: 'Artists',
      timestamps: true,
    }
  );
};

export default ArtistModel;
