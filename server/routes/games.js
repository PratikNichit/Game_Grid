const { Game, validate } = require('../models/game');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/', auth, async(req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send("Name not valid or not Entered");

    let game = new Game({
        name: req.body.name,
        genre: req.body.genre,
        rating: req.body.rating
    })

    game = await game.save();
    res.send(game);
})

router.put('/:id', auth, async (req, re,s) =>{

    const{ error } = validate(req.body);
    if(error) return res.status(400).send("Name not valid or not Entered");

    const game = await Game.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        genre: req.body.genre,
        rating: req.body.rating
    }, { new: true });

    if(!game) return res.status(400).send('Game not found');

    res.send(game);
});

router.delete("/:id", auth, async (req, res) => {

    const Game = await Game.findByIdAndDelete(req.params.id);

    if(!Game) return res.status(400).send('Game not found');

    res.send(`Game deleted: ${Game}`);
})

module.exports = router;



