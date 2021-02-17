const path = require('path');
const methodOverride = require('method-override')
const { v4: uuid } = require('uuid'); //For generating ID's
const express = require('express');
const app = express();

//To parse form data in POST request body:
app.use(express.urlencoded({ extended: true }))
// To parse incoming JSON in POST request body:
app.use(express.json())
// To 'fake' put/patch/delete requests:
app.use(methodOverride('_method'))
// Views folder and EJS setup:
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Our fake database:
let artists = [
    {
        id: uuid(),
        name: 'Todd',
        url: "https://source.unsplash.com/250x250/?art/1"
    },
    {
        id: uuid(),
        name: 'Skyler',
        url: "https://source.unsplash.com/250x250/?art/2"
    },
    {
        id: uuid(),
        name: 'May',
        url: "https://source.unsplash.com/250x250/?art/3"
    },
    {
        id: uuid(),
        name: 'DotPerson',
        url: "https://source.unsplash.com/250x250/?art/4"
    }
]

// **********************************
// INDEX - renders multiple artists
// **********************************
app.get('/artists', (req, res) => {
    res.render('artists/index', { artists });
})

// **********************************
// NEW - renders a form to create 
// **********************************
app.get('/artists/new', (req, res) => {
    res.render('artists/new');
})

// **********************************
// CREATE - creates a new artist
// **********************************
app.post('/artists', (req, res) => {
    const { name } = req.body;
    artists.push({ name, url: "https://source.unsplash.com/250x250/?art/" + uuid(), id: uuid() })
    res.redirect('/artists');
})

// **********************************
// SHOW - renders a single artist
// **********************************
app.get('/artists/:id', (req, res) => {
    const { id } = req.params;
    const artist = artists.find(a => a.id === id);
    res.render('artists/show', {artist});
})

// *******************************************
// EDIT - renders a form to edit an artist
// *******************************************
app.get('/artists/:id/edit', (req, res) => {
    const { id } = req.params;
    const artist = artists.find(a => a.id === id);
    res.render('artists/edit', { artist });
})


// *******************************************
// UPDATES - edits a particular artist
// *******************************************
app.patch('/artists/:id', (req, res) => {
    const { id } = req.params;
    const artist = artists.find(a => a.id === id);
    const newName = req.body.name;
    artist.name = newName;
    res.redirect('/artists');
})

// *******************************************
// DELETES - deletes a particular artist
// *******************************************
app.delete('/artists/:id', (req, res) => {
    const { id } = req.params;
    const artist = artists.find(a => a.id === id);
    artists.pop(artist);
    res.redirect('/artists');
})


app.listen(3001, () => {
    console.log("ON PORT 3001!")
})