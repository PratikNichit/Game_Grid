const express = require('express')
const { Rental, validate } = require('../models/rental');
const { User } = require('../models/user');
const { Game } = require('../models/game');
const router = express()
const auth = require('../middleware/auth')

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ _id: req.body.customerId });
    if(!user) return res.status(400).send('Invalid Customer ID');

    const game = await Game.findOne({ _id: req.body.gameId });
    if(!game) return res.status(400).send('Invalid Game ID');

    let rental = new Rental({
        customer: {
            username: user.username,
            email: user.email
        },
        game: {
            name: game.name
        }
    });

    rental = await rental.save();
    res.send(rental);

})

module.exports = router;