const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { User } = require('../models/user')
const Joi = require('joi');

router.post('/', async(req, res) => {
    if(req.body.email){
        const { error } = validateEmail(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        const user = await User.findOne({email: req.body.email});
        if(!user) return res.status(400).send('Invlaid Email');

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) return res.status(400).send('Invlaid Password');

        const token = user.generateAuthToken()
        res.send(token)
    }

    const { error } = validateUsername(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({username: req.body.username});
    if(!user) return res.status(400).send('Incorrect Username');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invlaid Password');

    const token = user.generateAuthToken()
    res.send(token)

    
})

function validateEmail(req){
    const schema = Joi.object({
        email: Joi.string().min(5).max(225).required().email(),
        password: Joi.string().min(5).max(1024).required()
    })

    const result = schema.validate(req);

    return result;
}

function validateUsername(req){
    const schema = Joi.object({
        username: Joi.string().min(5).max(225).required(),
        password: Joi.string().min(5).max(1024).required()
    })

    const result = schema.validate(req);

    return result;
}

module.exports = router;