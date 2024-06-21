//MongoDB module for Borrow Details 
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const borrowSchema = new Schema({
    userId: { type: String, required: true},
    userName: { type: String, required: true},
    userEmail: { type: String, required: true},
    userContact: { type: String, required: true},
    bookId: { type: String, required: true},
    borrowedDay: { type: Date, default: Date.now },
    returnDay: { 
        type: Date, 
        required: true,
        default: function() {
            return new Date(Date.now() + 14*24*60*60*1000); // 14 days from now
        }
    },
    returned: { type: Boolean, default: false }
});

const Borrow =mongoose.model('borrows',borrowSchema)

module.exports = Borrow