const mongoose = require('mongoose');
const moment = require('moment');
const helpers = require('../utils/helpers');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    title: { type: String, minlength: 1, maxlength: 1500 },
    message: { type: String, minlength: 1, maxlength: 10000 },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date, default: Date.now() },
})
messageSchema.virtual('extract').get(function () {
    return helpers.extract(String(this.message), 200);
});

messageSchema.virtual('url')
    .get(function () {
        return '/messages/' + this._id;
    })

messageSchema.virtual('dateFormatted')
    .get(function () {
        return moment(this.date).format('h:mm a, ddd DD MMMM, YYYY');
    })

module.exports = mongoose.model('Message', messageSchema);