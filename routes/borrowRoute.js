//Borrow Routes
const express = require('express');
const router = express.Router();
const Borrow = require('../models/Borrow');
const Book = require('../models/Book');

router.get('/', async (req, res) => {
    try {
        const result = await Borrow.find();
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).send("Borrow not found");
        }
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});

router.get('/searchBook', async (req, res) => {
    const { query } = req.query;
    try {
        const results = await Borrow.find({bookId:`${query}`});
        res.json(results);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/borrowBook', async (req, res) => {

    const borrowDetails = req.body;

    try {

        const book = await Book.findOne({ isbn: borrowDetails.bookId });

        if (book && book.copies > 0) {

            book.copies -= 1;

            await book.save();

            const borrow = new Borrow(borrowDetails);

            await borrow.save();

            res.json({ message: 'Book borrowed successfully' });

        } else {

            res.json({ message: 'Book is not available' });
        }
    } catch (err) {

        res.status(500).send(err);
    }

});

module.exports = router;