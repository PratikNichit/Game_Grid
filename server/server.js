const config = require('config');
const express = require('express');
const mongoose = require('mongoose');
const users = require('../server/routes/users');
const auth = require('../server/routes/auth');
const games = require('../server/routes/games');
const rentals = require('../server/routes/rentals');


const app = express();

app.use(express.json());
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/games', games);
app.use('/api/rentals', rentals)


if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/game-grid')
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.error("Could not connect to MongoDB.", err));

const port = 2000;
app.listen(port, () =>{
    console.log(`Listening to port ${port}`);
})


