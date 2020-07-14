const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    title: { type: String, minlength: 1, maxlength: 1500 },
    message: { type: String, minlength: 1, maxlength: 10000 },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date, default: Date.now() },
})

messageSchema.virtual('url')
    .get(function () {
        return '/messages/' + this._id;
    })

module.exports = mongoose.model('Message', messageSchema);