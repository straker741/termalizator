// Third party modules
const express = require("express");
const path = require("path");

// My Modules
const { APP_PORT } = require("./settings");
const { logger } = require("./middleware/middleware");
const router = require("./routes");

// Init express
const app = express();

// Init middleware
app.use(logger);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static static folder
app.use(express.static(path.join(__dirname, "public")));

// Init router
app.use("/", router);

app.listen(APP_PORT, () => {
    console.log(`Server started on port ${APP_PORT}.`);
});
