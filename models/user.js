const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: { type: String, required: true, maxlength: 100 },
    last_name: { type: String, required: true, maxlength: 100 },
    username: { type: String, required: true, maxlength: 60 },
    password: { type: String, required: true, minlength: 4, maxlength: 200 },
    status: { type: String },
    admin: { type: Boolean }
})

UserSchema
    .virtual('full_name')
    .get(function () {
        const full_name = '';
        if (this.first_name && this.last_name) {
            full_name = this.first_name + ' ' + this.last_name;
        }
        if (!this.first_name || !this.last_name) {
            full_name = this.first_name + ' ' + this.last_name;
            full_name = '';
        }
        return full_name;
    })

UserSchema
    .virtual('url')
    .get(function () {
        return url = '/member/' + this._id;
    })

// Export model
module.exports = mongoose.model('User', UserSchema);