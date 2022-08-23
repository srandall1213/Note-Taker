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

//HTML ROUTES//

//GET /notes returns notes.html 
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"))
});

//GET * returns index.html

//API ROUTES//

//GET /api/notes should read the db.json file and return all saved notes as JSON

//POST /api/notes should receive a new note to save on the request body, add it to the db.json file, 
// and then return the new note to the client. You'll need to find a way to give each note a unique id 
//when it's saved (look into npm packages that could do this for you).

//DELETE

//Listening
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🙌`)
);