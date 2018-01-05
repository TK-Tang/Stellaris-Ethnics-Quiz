const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");

const models = require("./models");

const app = express();

app.use(bodyParser.json());
app.use(bodyhParser.urlencoded({ extended:true }));

app.set("views", path.join(__dirname, "/app/views"));
app.use(express.static(path.join(__dirname, "/public")));

app.engine("/html", engines.mustache);
app.set("view engine", "html");
app.engine("html", require("ejs").renderFile);

app.use("/", HomeRouter);

app.listen(8080, function(){
    console.log("Stellaris ethnics quiz listening on port 8080!");
})