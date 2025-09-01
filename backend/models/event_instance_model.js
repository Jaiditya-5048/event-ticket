import { DataTypes } from 'sequelize';

const EventInstanceModel = (sequelize) => {
  const EventInstance = sequelize.define(
    'EventInstance',
    {
      instance_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      event_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      venue_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { 
      paranoid: true,
      tableName: 'EventInstances',
      timestamps: true,
    }
  );

  return EventInstance;
};

export default EventInstanceModel;
