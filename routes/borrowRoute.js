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
router.post('/returnBook', async (req, res) => {
    const { userId, bookId } = req.body;
    try {
        const borrow = await Borrow.findOneAndUpdate({
            userId: userId, 
            bookId: bookId,
            returned: false,
        }, { returned: true });
        if (borrow) {
            const book = await Book.findOne({ isbn: bookId });
            if (book) {
                book.copies += 1;
                await book.save();
            }
            res.json({ message: 'Book returned successfully' });
        } else {
            res.json({ message: 'Return error: book not borrowed by this user' });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});
//reccomend
router.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const result = await Borrow.find({ userId: userId });
        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).send("Books not found for the given userId");
        }
    } catch (error) {
        console.error('Error fetching books for userId:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});
module.exports = router;