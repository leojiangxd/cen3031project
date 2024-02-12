const mongoose = require('mongoose');
const Schema = mongoose.Schema
const discordserverSchema = new Schema({
    serverName: {type: String, required: true},
    url: {type: String, required: true},
    description: {type: String, required: true},
    memberCount: {type: Number, required: true},
    //icon: {type: Image, required: false}
});

const discordServer = mongoose.model("DiscordServer", discordserverSchema);
module.exports = discordServer;