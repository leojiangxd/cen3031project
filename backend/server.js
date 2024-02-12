const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const discordServersRouter = require("./routes/discordservers");
const discordUsersRouter = require("./routes/discordusers");

app.use("/discordservers", discordServersRouter);
app.use("/discordusers", discordUsersRouter);


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
