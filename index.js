const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const engines = require("consolidate");

const models = require("./models");
const scripts = require("./scripts/start_script.js");

const HomeRouter = require("./routes/home.server.router");
const StellarisSurveyRouter = require("./routes/stellaris.survey.router");
const EditStellarisSurveyRouter = require("./routes/stellaris.edit.survey.router");


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));

app.engine("/html", engines.mustache);
app.set("view engine", "html");
app.engine("html", require("ejs").renderFile);

app.use("/", HomeRouter);
app.use("/StellarisSurvey", StellarisSurveyRouter, express.static(path.join(__dirname, "/public")));
app.use("/EditStellarisSurvey", EditStellarisSurveyRouter, express.static(path.join(__dirname, "/public")));

// Syc models, drop databases, connect to database and start application
models.sequelizeCredentials.sync({force: true}).then(() => {
    scripts.startScript();

    app.listen(7000, function(){
        console.log("Stellaris ethnics survey listening on port 7000!");
    })
}).catch(e => {
    console.error("There was a connection error with the database.");
    console.error(e);
})