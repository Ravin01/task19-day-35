// Import the express
const express = require("express");
const app = express();
// Port
const port = 5001;
// Accessing file system
const fs = require("fs");


// Api end point which will be creating the files
app.get("/", function (req, res) {
  let date = new Date();
  let data = date.valueOf().toString();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let  day = date.getDay();
  let hours = date.getHours();
  let mins = date.getMinutes();
  let sec = date.getSeconds();
  // Variable for storing file name
  const fileName = `Date_${year}-${month}-${day},time_${hours}-${mins}-${sec}.txt`;
  // Creating file
  fs.writeFile(`./apiFolder/${fileName}`, data, (err) => {
    if (err) throw err;
    console.log("completed writing file : ", fileName);
  });
  res.send(
    `Completed Writing File, File name : ${fileName}, Content of the file is : ${data}, urlPath : /file to get all the files`
  );
});


// Api end point for accessing the files.
app.get("/file", (req, res)=> {
  fs.readdir("./apiFolder", (err, file) => {
    res.send(file)
  });
});


// server running port number
app.listen(port, () => {
  console.log("server is running in ", port);
});
