const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { v4: uuidv4 } = require('uuid');

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
  externalReference: {
    type: DataTypes.UUID,
    defaultValue: uuidv4,
    unique: true,
    allowNull: false
  },
  externalId: {
    type: DataTypes.BIGINT,
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
    allowNull: true
  },
  payerId: {
    type: DataTypes.BIGINT,
    allowNull: true
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