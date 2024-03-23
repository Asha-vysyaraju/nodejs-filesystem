const fs = require("fs")
const express = require('express')
const app = express()
const PORT = 3000

// API endpoint for Homepage
app.get('/', function (req, res) {
  res.send('Welcome to NodeJs File System')
})

// API endpoint for creating text file
app.get('/createFile', function (req, res) {
  const currentDate = new Date();
  const date = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getYear();
  const time = currentDate.getTime();
  const fileName = `${date}-${month}-${year}-${time}`;
  const timestamp = new Date().toISOString();

  fs.writeFile(`./text-files/${fileName}.txt`, timestamp, (err) => {
    if (err) {
      console.log(err)
      res.status(404).send({ message: "Failed to create text File" })
    } else {
      console.log("Text file is created")
      res.status(200).send(`Text file ${fileName}.txt is created Successfully..`)
    }

  })

})

// API end point for getting all files
app.get('/getAllTextFiles', function (req, res) {


  fs.readdir("./text-files", (err, files) => {
    if (err) {
      console.log(err)
      res.status(404).send({ message: "Failed to retrieve text files." });
    } else {
      console.log("Text file is created");
      res.status(200).send(`Text files retrived are ${files}`)
    }

  })

})

// API endpoint for 404 error
app.get('/*',(req,res)=>{
  res.send(`404 Page not found`)
});



app.listen(PORT, () => console.log("Server is starting", PORT))