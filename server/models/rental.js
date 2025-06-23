const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const Rental = mongoose.model("Rental", new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            username:{
                type: String,
                required: true,
                minLength: 2,
                maxLength: 50
            },

            email:{
                type: String,
                required: true,
                minLength: 5,
                maxLength: 225,
                unique: true
            }
        })
    },

    game: {
        type: mongoose.Schema({
            name:{
                type: String,
                require: true
            }
        })
    }
}));

function validateRental(rental) {
    const schema = Joi.object({
      customerId: Joi.objectId().required(),
      gameId: Joi.objectId().required()
    });
  
    return schema.validate(rental);
}
  
exports.validate = validateRental;
exports.Rental = Rental; 
