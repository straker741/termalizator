/* ---------- */
/* Middleware */
/* ---------- */

const toSqlDate = (date) => {
    const pad = (number, digits) => {
        let padded = "" + number;
        while (padded.length < digits) {
          padded = "0" + padded;
        }
        return padded;
    }
    const year = pad(date.getFullYear(), 4);
    const month = pad(date.getMonth() + 1, 2);
    const day = pad(date.getDate(), 2);
    const hour = pad(date.getHours(), 2);
    const min = pad(date.getMinutes(), 2);
    const sec = pad(date.getSeconds(), 2);
    return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
}

const logger = (req, res, next) => {
    const datetime = new Date();
    console.log("--------------------------------------");
    console.log(`Method:   ${req.method}`);
    console.log(`URL:      ${req.protocol}://${req.get("host")}${req.originalUrl}`);
    console.log(`Datetime: ${toSqlDate(datetime)}`);
    next();
};

module.exports = { toSqlDate, logger };
