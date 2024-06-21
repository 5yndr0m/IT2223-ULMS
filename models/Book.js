//MongoDB module for Books
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
    name: { type: String, required: true},
    author: { type: String, required: true},
    isbn: { type: String, required: true},
    year: { type: Number, required: true},
    copies: { type: Number, required: true}
});

const Book =mongoose.model('books',bookSchema)

module.exports = Book