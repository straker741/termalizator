const APP_PORT = process.env.PORT || 5000;
const BASE_PATH = process.env.BASE_PATH || "C:/Users/Jakub/Desktop/SKOLA/0_TOMAS/termalizator/";
// Path must end with /
const SCRIPT_NAME = process.env.SCRIPT_NAME || "gpioHandler.py";


module.exports = { APP_PORT, BASE_PATH, SCRIPT_NAME };
