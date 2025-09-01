import { DataTypes } from 'sequelize';

const EventModel = (sequelize) => {
  const Event = sequelize.define(
    'Event',
    {
      event_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      description: {
        type: DataTypes.TEXT,
      },
      organiser_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: 'Events',
      timestamps: true,
      paranoid: true,
    }
  );

  Event.associate = (models) => {
    Event.belongsTo(models.User, {
      foreignKey: 'organiser_id',
      as: 'organiser',
    });

    // You can add hasMany associations to EventInstances, etc. later
  };

  return Event;
};

export default EventModel;
