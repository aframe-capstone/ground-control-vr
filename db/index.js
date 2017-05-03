const Sequelize = require('sequelize');

// Use Herkoku DB env variable after deployment
const db = new Sequelize('postgres://localhost:5432/aframe-capstone', {
  logging: false
});

module.exports = db;
