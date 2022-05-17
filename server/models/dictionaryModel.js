const {Schema, model} = require('mongoose');

const DictionarySchema = new Schema({
    word: {type: String, unique: true, required: true},
    translation: {type: String, required: true},
});

module.exports = model('Dictionary', DictionarySchema);