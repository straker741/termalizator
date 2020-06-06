const { ConfigSchema } = require("../schemas");
const {
    getJsonData,
    saveJsonData,
    updateJsonData
} = require("../middleware/jsonHandler");
const { isRunning, startProcess, killProcess } = require("../middleware/processes");
const { BASE_PATH, SCRIPT_NAME } = require("../settings");

// @desc    Returns data
// @route   GET:/data
const getData = (req, res) => {
    try {
        const data = getJsonData(BASE_PATH + "data.json");

        console.log("Status:  ", 200);
        res.status(200);
        res.json(data);
    }
    catch (err) {
        console.log("Status:  ", 500);
        console.log(err);
        res.status(500);
        res.send("Internal Server Error");
    }
};


// @desc    Returns configuration
// @route   Get:/config
const getConfig = (req, res) => {
    try {
        const config = getJsonData(BASE_PATH + "config.json");

        console.log("Status:  ", 200);
        res.status(200);
        res.json(config);
    }
    catch (err) {
        console.log("Status:  ", 500);
        console.log(err);  
        res.status(500);
        res.send("Internal Server Error");
    }
};


// @desc    Updates configuration
// @route   PUT:/config
const putConfig = async (req, res) => {
    try {
        const isValid = await ConfigSchema.isValid(req.body);
        if (isValid) {
            console.log("Validation successful!");
            
            updateJsonData(BASE_PATH + "config.json", req.body);
            const processes = await isRunning(SCRIPT_NAME);
            if (processes.length === 0) {
                // Start process
                startProcess(SCRIPT_NAME);
            }
            // Otherwise do nothing

            console.log("Status:  ", 200);
            res.status(200);
            res.json({
                msg: "You have succeessfully updated configuration."
            });
        }
        else {
            console.log("Validation not successful!");
            console.log("Status:  ", 400);
            res.status(400);
            res.send("");
        }       
    }
    catch (err) {
        console.log("Status:  ", 500);
        console.log(err);  
        res.status(500);
        res.send("Internal Server Error");
    }
};


// @desc    Stops measurement of temperature
// @route   GET:/stop
const stop = (req, res) => {
    try {
        killProcess(SCRIPT_NAME)

        console.log("Status:  ", 200);
        res.status(200);
        res.json(config);
    }
    catch (err) {
        console.log("Status:  ", 500);
        console.log(err);  
        res.status(500);
        res.send("Internal Server Error");
    }
};


module.exports = { getData, getConfig, putConfig, stop };
