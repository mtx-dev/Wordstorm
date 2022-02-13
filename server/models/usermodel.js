const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    // TODO: realize Activations
    isActivated: {type: Boolean, default: true},
    activationLink: {type: String},
});

module.exports = model('User', UserSchema);