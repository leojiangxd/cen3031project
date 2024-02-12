const router = require("express").Router();
let DiscordServer = require("../models/discordserver.model");

// Get a list of all servers on the database
router.route('/').get((req, res) => {
    DiscordServer.find()
        .then(servers => res.json(servers))
        .catch(err => res.status(400).json('Error: ' + err));
});
// Add a server to the database
router.route('/add').post((req, res) => {
    const {serverName, url, description, memberCount} = req.body;

    //const icon = req.body.icon;

    const newServer = new DiscordServer({
        serverName,
        url,
        description,
        memberCount,
        //icon
    });
    newServer.save()
        .then(() => res.json('Server ' + serverName + ' added'))
        .catch(err => res.status(400).json('Error: ' + err));
});
// Get information on a specific server
router.route('/:id').get((req, res) => {
    DiscordServer.findById(req.params.id)
        .then(serv => {
            res.json(serv);
            console.log(req.params.id);
        })
        .catch(err => res.status(400).json('Error: ' + err));
});
// Update a server entry
router.route('/update/:id').post((req, res) => {
    DiscordServer.findById(req.params.id)
        .then(serv => {
            serv.serverName = req.body.serverName;
            serv.url = req.body.url;
            serv.description = req.body.description;
            serv.memberCount = Number(req.body.memberCount);
            //serv.icon = req.body.icon;
            serv.save()
                .then(() => res.json('Updated ' + req.body.serverName))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.json('Error: ' + err));

});
// Delete a server entry
router.route('/:id').delete((req, res) => {
    DiscordServer.findByIdAndDelete(req.params.id)
        .then(serv => res.json('Deleted ' + serv.serverName))
        .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;