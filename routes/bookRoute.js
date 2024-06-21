const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Add a new book
router.post('/addBook', async (req, res) => {
    const { name, author, isbn, year, copies } = req.body;
    try {
        const newBook = await Book.create({ name, author, isbn, year, copies });
        res.status(201).json({ message: 'Book added successfully', book: newBook });
    } catch (error) {
        console.error('Error adding book:', error);
        res.status(500).json({ message: 'Error adding book', error });
    }
});

router.put('/updateBook/:id', async (req, res) => {
    const { id } = req.params;
    const { name, author, isbn, year, copies } = req.body;
    const updateFields = {};
    if(name) updateFields.name = name;
    if(author) updateFields.author = author;
    if(isbn) updateFields.isbn = isbn;
    if(year) updateFields.year = year;
    if(copies) updateFields.copies = copies;
    try{
        const updatebook = await Book.findByIdAndUpdate( id, { $set: updateFields }, { new: true });
        res.status(200).json({ status: true, message: 'Book updated successfully', book: updatebook });
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(400).json({ message: 'Error updating book', error });
    }
});

router.delete('/deleteBook/:id', async (req, res) => {
    const { id } = req.params;
    try{
        await Book.findByIdAndDelete(id);
        res.status(200).json({ status: true,message: `Operation performed successfully.`, });
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(400).json({ message: 'Error deleting book', error });
    }
})

//reccomend
router.get('/:isbn', async (req, res) => {
    try {
        const isbn = req.params.isbn;
        const result = await Book.find({ isbn: isbn });
        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: "Books not found for the given isbn"});
        }
    } catch (error) {
        console.error('Error fetching books for isbn:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});

//reccomend
router.get('/genre/:genre', async (req, res) => {
    try {
        const genre = req.params.genre;
        const result = await Book.find({ genre: genre });
        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: "Books not found for the given genre"})
        }
    } catch (error) {
        console.error('Error fetching books for genre:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});
module.exports = router;
