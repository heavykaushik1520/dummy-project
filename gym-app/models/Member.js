const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Member = sequelize.define(
  "Member",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 16,
      },
    },
    weight: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        min: 25,
      },
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Member;
