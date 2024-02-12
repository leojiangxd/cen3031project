const mongoose = require('mongoose');
const Schema = mongoose.Schema
const discordUserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    serverList: {type: [String], default: []},
});

const discordUser = mongoose.model("DiscordUser", discordUserSchema);
module.exports = discordUser;