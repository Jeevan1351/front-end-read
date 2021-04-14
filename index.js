const express = require("express");
const path = require("path");
const app = express();
var fs = require("fs");
const bodyParser = require("body-parser");
const get_data = require("./list_activities4");
const lineReaderSync = require("line-reader-sync");
const { sfa } = require("./list_activities4");
 
app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/read", (req, res) => {
  var a = req.body.student_email;
  //var d = get_data.lk(a)
 // d.then(function(value){
    //console.log("This index.js ",value, d);
  res.render("read", { 
    
    contents :  get_data.lk(a, get_data.sfa, get_data.dw),
  });
  }); 


app.listen(3000, () => {
  console.log("Server listening to port: 3000");
});
 
