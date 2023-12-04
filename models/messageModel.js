const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    user: String,
    room:{
         type: mongoose.Schema.Types.ObjectId,
        ref: 'room',
    },   
    message: String,
    timestamp: { type: Date, default: Date.now }
});

const Room = mongoose.model('message', messageSchema);
module.exports = Room;