const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const engines = require("consolidate");

const models = require("./models")
const HomeRouter = require("./routes/home.server.router");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "")));

app.engine("/html", engines.mustache);
app.set("view engine", "html");
app.engine("html", require("ejs").renderFile);

app.use("/", HomeRouter);

models.sequelize.sync( {force: true}.then(() => {
    const date = new Date();

    const defaultQuestion = {
        question: "Granting full citizenship to any sapient alien, regardless of their biology and culture is beneficial for civilization.",
        xenophobia: 0,
        xenophilia: 75,
        egalitarian: 50,
        authoritarian: 0,
        materialist: 0,
        spiritualist: 0,
        militarist: 0,
        pacifist: 0,
        lastModified: date.getDate() + ":" + date.getHours()
    }

    models.sellarisQuestions.create(defaultQuestion).then(result => {
        console.log("Default question added.");
    })


    app.listen(8080, function(){
        console.log("Stellaris ethnics quiz listening on port 8080!");
    })
})).catch(e => {
    console.error("There was a connection error with the database.");
    console.error(e);
})