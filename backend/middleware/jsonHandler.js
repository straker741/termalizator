const fs = require("fs");


const getJsonData = (fullPath) => {
    const data = fs.readFileSync(fullPath, "utf8"); 
    return JSON.parse(data);
};


const saveJsonData = (fullPath, data) => {
    fs.writeFileSync(fullPath, JSON.stringify(data), "utf8");
};


const updateJsonData = (fullPath, newData) => {
    let data = getJsonData(fullPath);

    const keys = Object.keys(data);
    for (let key of keys) {
        data[key] = (key in newData ? newData[key] : data[key]);
    }
    saveJsonData(fullPath, data);
};


module.exports = { getJsonData, saveJsonData, updateJsonData };