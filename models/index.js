"use strict";

const path = require("path");
const Sequelize = require("sequelize");
const fs = require("fs");

const db = {};

const sequelizeCredentials = new Sequelize("Stellaris", "StellarisAdmin", "24157817", {
    host: "localhost",
    port: "5432",
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
    const model = sequelizeCredentials.import(path.join(__dirname, file));
    db[model.name] = model;
});

db.sequelizeCredentials = sequelizeCredentials;
db.Sequelize = Sequelize;
db.StellarisQuestions = require("./stellaris_question")(sequelizeCredentials, Sequelize);

module.exports = db;