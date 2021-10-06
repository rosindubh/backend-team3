//phil welsby - 22 sept 2021 - guitar.models.js

const mongoose = require("mongoose");

const guitarSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    year: {
        type: String,

    },
});

const Guitar = mongoose.model("Guitar", guitarSchema);

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model("User", userSchema);

module.exports = {Guitar, User,};
