const express = require("express");
const path = require("path");
const app = express();
var fs = require("fs");
const bodyParser = require("body-parser");
const get_data = require("./list_activities");
const lineReaderSync = require("line-reader-sync");

app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/read", (req, res) => {
  var a = req.body.student_email;
  var value = new lineReaderSync(__dirname + "\\" + a + ".txt");
  res.render("read", {
    contents: value.readline(),
  });
});

app.listen(3000, () => {
  console.log("Server listening to port: 3000");
});
