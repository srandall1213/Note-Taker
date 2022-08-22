//Dependencies
const express = require('express'); 
const path = require("path");
const fs = require("fs");

//Server
const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Middleware
app.use(express.static('public'));

//GET

//GET

//GET

//POST

//DELETE

//Listening
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🙌`)
);