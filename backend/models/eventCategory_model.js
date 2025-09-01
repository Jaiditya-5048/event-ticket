// models/category_model.js
const EventCategoryModel = (sequelize, DataTypes) => {
  return sequelize.define(
    'Category',
    {
      category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      tableName: 'EventCategories',
      timestamps: true,
    }
  );
};

export default EventCategoryModel;
