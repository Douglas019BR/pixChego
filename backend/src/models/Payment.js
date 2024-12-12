const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Payment = sequelize.define('Payment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending'
  },
  externalId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  externalReference: {
    type: DataTypes.STRING,
    allowNull: true
  },
  orderStatus: {
    type: DataTypes.STRING,
    allowNull: true
  },
  isTest: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false
  },
  clientId: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  paidAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
});

module.exports = Payment;