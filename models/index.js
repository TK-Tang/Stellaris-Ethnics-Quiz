"use strict";

const path = require("path");
const sequelizeModule = require("sequelize");
const fs = require("fs");

const db = {};

const sequelizeCredentials = new Sequelize("Stellaris", "StellarisAdmin", "24157817", {
    host: "localhost",
    port: "15432",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
    },
});

fs.readdirSync(__dirname).filter(function(file){
    return (file.indexOf(".") !== 0) && (file !== "index.js")
}).forEach (function (file){
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
});

db.sequelize = sequelizeCredentials;
db.Sequelize = sequelizeModule;
db.StellarisQuestions = require("./stellarisQuestions")(sequelizeCredentials, sequelizeModule);

module.exports = db;