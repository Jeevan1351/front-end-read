const express = require("express");
const path = require("path");
const app = express();
var fs = require("fs");
const bodyParser = require("body-parser");
const get_data = require("./list_activities");
const lineReaderSync = require("line-reader-sync");
const { sfa } = require("./list_activities");

app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/read", (req, res) => {
  var a = req.body.student_email;
  var data = get_data.lk(a, get_data.sfa, get_data.dw);
  var names = [];
  var days = [];
  for (var i = 1; i < data.length; i++) {
    names.push(data[i][2]);
    days.push(data[i][0]);
  }
  //console.log(days, names);
  res.render("read", {
    total_days: data[0],
    data: days,
    lables: names,
  });
});

app.listen(3000, () => {
  console.log("Server listening to port: 3000");
});
