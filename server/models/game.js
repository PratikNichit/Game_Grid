const mongoose = require('mongoose');
const Joi = require('joi')

const Game = mongoose.model('Game', new mongoose.Schema({
    name:{
        type: String,
        require: true
    },

    genre:{
        type: String,
        required: true
    },

    rating:{
        type: Number,
        required: true
    }
}));

function validateGame(game){
    const schema = Joi.object({
        name: Joi.string().required(),
        genre: Joi.string().required(),
        rating: Joi.number().required()
    })

    const result = schema.validate(game);

    return result;
}

exports.Game = Game;
exports.validate = validateGame;