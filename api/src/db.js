const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT, DB_DEPLOY } =
  process.env;

const sequelize = new Sequelize(DB_DEPLOY, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { Repuesto, Marca, MarcaRep } = sequelize.models;

Marca.belongsToMany(Repuesto, { through: "Repuesto_Marca", timestamps: false });
Repuesto.belongsToMany(Marca, { through: "Repuesto_Marca", timestamps: false });

MarcaRep.hasMany(Repuesto);
Repuesto.belongsTo(MarcaRep);

module.exports = {
  Repuesto,
  Marca,
  MarcaRep,
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
