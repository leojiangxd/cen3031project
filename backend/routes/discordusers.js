const router = require("express").Router();
const bcrypt = require("bcrypt")
let DiscordUser = require("../models/discorduser.model");

// Get a list of all users on the database
router.route('/').get((req, res) => {
    DiscordUser.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});
// Add a user to the database
router.route('/register').post(async (req, res) => {
    // Get input
    const {username, password} = req.body; 
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Add user
    const newUser = new DiscordUser({
        username, password: hashedPassword
    });
    await newUser.save()
        .then(() => res.json(username + ' added, id: ' + newUser.id + ', hashed password: ' + hashedPassword))
        .catch(err => res.status(400).json('Error: ' + err));
});
// Attempt to log in
router.route('/login').post(async (req, res) => {
    // Get input
    const {username, password} = req.body;
    // Find user
    const user = await DiscordUser.findOne({username});
    if (!user)
        return res.status(401).json('Invalid username or password');
    // Check password
    const validPassword = await bcrypt.compare(password, user.password)
    .catch(err => res.status(400).json('Error: ' + err));
    if (validPassword)
        res.json('Authentication successful.');
    else
        res.status(401).json('Invalid username or password');

});
// Add a server's id to user's list
router.route('/add/:id').post((req, res) => {
    DiscordUser.findById(req.params.id)
    .then(user => {
        user.serverList.push(req.body.serverId);
        user.save()
            .then(() => res.json('Added ' + req.body.serverId))
            .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.json('Error: ' + err));
});
// Get information on a specific user
router.route('/:id').get((req, res) => {
    DiscordUser.findById(req.params.id)
        .then(user => {res.json(user)})
        .catch(err => res.status(400).json('Error: ' + err));
});
// Update a user entry
router.route('/update/:id').put((req, res) => {
    DiscordUser.findByIdAndUpdate(
        req.params.id, req.body.username, req.body.password)
        .then(() => res.json('Updated ' + req.body.username))
        .catch(err => res.json('Error: ' + err));

});
// Delete a user entry
router.route('/:id').delete((req, res) => {
    DiscordUser.findByIdAndDelete(req.params.id)
        .then(user => res.json('Deleted ' + user.username))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;