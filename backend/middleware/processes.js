const find = require("find-process");
const { spawn, spawnSync } = require("child_process");
const { BASE_PATH } = require("../settings");


const isRunning = async (processName) => {
    return await find("name", processName);
};


const startProcess = (processName) => {
    const subprocess = spawn("python3", [`${BASE_PATH}${processName}`], {
        detached: true,
        stdio: 'ignore'
    });

    subprocess.on('error', (err) => {
        console.error('Failed to start subprocess!');
        console.log(err);
    });

    subprocess.unref();
};


const killProcess = (processName) => {
    const subprocess = spawnSync("pkill", ["-f", `${processName}`], {
        detached: true,
        stdio: 'ignore'
    });

    if (subprocess.error) {
        throw Error(`Failed to kill subprocess: ${subprocess.error.name}`);
    }
};


module.exports = { isRunning, startProcess, killProcess };
