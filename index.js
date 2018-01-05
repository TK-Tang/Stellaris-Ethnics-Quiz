const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const engines = require("consolidate");

const HomeRouter = require("./routes/home.server.router");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "")));

app.engine("/html", engines.mustache);
app.set("view engine", "html");
app.engine("html", require("ejs").renderFile);

app.use("/", HomeRouter);

app.listen(8080, function(){
    console.log("Stellaris ethnics quiz listening on port 8080!");
})