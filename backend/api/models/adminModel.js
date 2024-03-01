const { sequelize } = require('../../database');
const { DataTypes } = require('sequelize');

const Admin = sequelize.define(
  'admins',
  {
    name: {
      type: DataTypes.STRING(191), // Longitud reducida a 191
      allowNull: false,
    },
    surName: {
      type: DataTypes.STRING(191), // Longitud reducida a 191
      allowNull: false,
    },
    nif: {
      type: DataTypes.STRING(191), // Longitud reducida a 191
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(191), // Longitud reducida a 191
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        msg: 'Invalid email format',
      },
    },
    password: {
      type: DataTypes.STRING(191), // Longitud reducida a 191
      allowNull: false,
    },
    mobile: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(191), // Longitud reducida a 191
      allowNull: false,
    },
    hospital: {
      type: DataTypes.STRING(191), // Longitud reducida a 191
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
  },
  {
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci'
  }
);

module.exports = Admin;
