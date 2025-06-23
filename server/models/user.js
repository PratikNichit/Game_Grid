const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50,
        unique: true
    },

    email: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 225,
        unique: true
    },

    password: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 1024
    }
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'))
    return token;
}

const User = new mongoose.model('User', userSchema);

function validateUsers(user){
    const schema = Joi.object({
        username: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(225).required().email(),
        password: Joi.string().min(5).max(1024).required()
    })
    const result = schema.validate(user);

    return result;
}

exports.validate = validateUsers;
exports.User = User;