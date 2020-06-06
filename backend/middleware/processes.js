const find = require("find-process");
const { exec } = require('child_process');


const isRunning = async (processName) => {
    await find("name", processName).then((list) => {
        console.log(list);
    }).catch((err) => {
        console.log(err.stack || err);
    });
};


const startProcess = (processName) => {
    exec(`nohup python3 $HOME/termalizator/scripts/${processName} >/dev/null 2>&1 &`, (error) => {
        if (error) {
            console.log(error.stack);
            console.log('Error code: '+error.code);
            console.log('Signal received: '+error.signal);
        }
    });
};


const killProcess = (processName) => {
    exec(`pkill -f ${processName}`, (error) => {
        if (error) {
            console.log(error.stack);
            console.log('Error code: '+error.code);
            console.log('Signal received: '+error.signal);
        }
    });
};


module.exports = { isRunning, startProcess, killProcess };
