const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bookRoute = require('./route/bookRoute');
const borrowRoute = require('./route/borrowRoute');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/library', {
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(error => {
    console.error('Error connecting to MongoDB:', error);
});

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Routes
app.use('/book', bookRoute);
app.use('/borrow', borrowRoute);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
