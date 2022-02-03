const Express = require('express');
const moment = require('moment');
const momentDurationFormatSetup = require("moment-duration-format");
momentDurationFormatSetup(moment);
const axios = require('axios');

typeof moment.duration.fn.format === "function";
typeof moment.duration.format === "function";

const app = Express();

app.set('view engine', 'ejs');

let date;

const dataUpdater = async () => {
    const data = (await axios.get('https://landcon.org/site-config.json')).data;
    date = moment(data.date, "YYYY-MM-DD");
}

app.all('*', (req, res) => {
    const current = moment();
    const diff = moment.duration(date.diff(current));

    console.log(diff);

    const dateString = diff.format("D [day]");

    res.render("index", { dateString });
});

app.listen(80, () => {
    console.log("Running")
});

setInterval(dataUpdater, 86400000);
dataUpdater();