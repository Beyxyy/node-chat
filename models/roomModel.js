const mongoose = require('mongoose');
const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});
const Room = mongoose.model('Room', roomSchema);
module.exports = Room;
