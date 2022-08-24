//Dependencies
const express = require("express"); 
const path = require("path");
const fs = require("fs");
const util = require("util");
const uuid = require('./helpers/uuid');

//Server
const PORT = process.env.PORT || 3001;
const app = express();

//Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Middleware for the static public files
app.use(express.static('public'));

// GET Route returns homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

//GET "/notes" returns notes.html
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"))
});

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

//API ROUTES//

//Function to write data to the JSON file given a destination and some content
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

//Append Function
const appendNote = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

//GET /api/notes should read the db.json file and return all saved notes as JSON
app.get("/api/notes", (req, res) => {
  console.info(`${req.method} request received to add a note`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  
})

//POST /api/notes should receive a new note to save on the request body, add it to the db.json file, 
// and then return the new note to the client. You'll need to find a way to give each note a unique id 
//when it's saved (look into npm packages that could do this for you).
app.post('/api/notes', (req, res) => {
  console.info(`${req.method} request received to add a note`);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };

    appendNote(newNote, './db/db.json');

    res.json(`Note added successfully 📝`);
    
  } else {
    res.error('Error in adding note');
  }
});

//DELETE /api/notes/:id should receive a query parameter that contains the id of a note to delete. 
//To delete a note, you'll need to read all notes from the db.json file, remove the note with the 
//given id property, and then rewrite the notes to the db.json file.

//GET wildcard returns index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"))
});
 
//Listening
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🙌`)
);