const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: {type: String, required: true, trim: true},
        email: {type: String, required: true, trim: true},
        password: {type: String, required: true},
        pic: {type: String, required: true, default: "https://cdn3.vectorstock.com/i/thumb-large/32/12/default-avatar-profile-icon-vector-39013212.jpg"}
    }, 
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;