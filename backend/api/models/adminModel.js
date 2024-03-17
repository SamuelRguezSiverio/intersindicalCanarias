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
      type: DataTypes.STRING(191),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'El formato del email no es válido.' // Mensaje de error personalizado
        }
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
    workPlace: {
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
    },
    resetPasswordToken: {
      type: DataTypes.STRING(40),
      allowNull: true, // Puede ser nulo porque no todos los usuarios tendrán un token todo el tiempo
    },
    resetPasswordExpires: {
      type: DataTypes.DATE,
      allowNull: true, // Puede ser nulo por la misma razón que el token
    },
  },
  {
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci'
  }
);

module.exports = Admin;
