const cors = require('cors');
const express = require('express');
const router = express.Router();

const {
    getData,
    getConfig,
    putConfig,
    stop
} = require("./controllers/termalizator");


router.get("/data", getData);

// Pre-flight request for PUT:/config
router.options("/config", cors());
router.get("/config", getConfig);
router.put("/config", cors(), putConfig);

router.get("/stop", stop);

module.exports = router;
