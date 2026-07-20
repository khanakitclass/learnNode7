"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Terms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Terms.hasOne(models.Products, {
        foreignKey: "terms_id",
        as: "productTerms",
      });
    }
  }
  Terms.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Terms",
      timestamps: true,
      paranoid: true,
    },
  );
  return Terms;
};
