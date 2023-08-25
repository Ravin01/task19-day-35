// Import the express
const express = require('express');
const app = express();
// Port
const port = 5000;
// Accessing file system
const fs = require('fs');
// Accessing data object
const date = new Date();
const data = date.toISOString();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDay();
const hours = date.getHours();
const mins = date.getMinutes();
const sec = date.getSeconds();
// Variable for storing file name
const fileName = `./apiFolder/Date${year}-${month}-${day},time${hours}-${mins}-${sec}.txt`;
// Writing the files with current date and time
fs.writeFile(fileName, data, (err) => {
    if (err) throw err;
    console.log("complete writing file")
})
// Api end point which will be creating the files
app.get('/', function (req, res) {
    res.send(`Completed Writing File, FileName : ${fileName}, Content : ${data}`)
})
// empty array
const retrieveData = [];
// Read the folder and push the every file into the array
fs.readdir("./apiFolder", (err, file) => {
    file.forEach((file) => {
        fs.readFile(`./apiFolder/${file}`, "utf-8", (err, data) => {
            if (err) throw err;
            return retrieveData.push(data);
        })
    });
});
// Api end point for accessing the file content.
app.get('/api', function (req, res) {
    res.send(retrieveData);
})



// server running port number
app.listen(port, () => {
    console.log("server is running in ", port);
})