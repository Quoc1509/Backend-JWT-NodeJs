'use strict';
require("dotenv").config();

const fs = require('fs'); //thư viện fs dùng để đọc, ghi file
const path = require('path'); //thư viện đường dẫn đến file
const Sequelize = require('sequelize'); 
const basename = path.basename(__filename); //lay file name
const env = process.env.NODE_ENV || 'development'; //chọn môi trường
const config = require(__dirname + '/../config/config.json')[env];
const db = {};


// tạo sequelize (kết nối database)
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;