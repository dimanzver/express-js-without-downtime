const express = require("express");
const chokidar = require("chokidar");
require('dotenv').config();

const app = express();
app.use((req, res, next) => {
    const appCallback = require(process.env.WATCH_FILE).default;
    appCallback(req, res, next);
});

const watcher = chokidar.watch(process.env.WATCH_FILE);
watcher.on('ready', function () {
    watcher.on('all', function () {
        console.log('HOT RELOAD!');
        delete require.cache[process.env.WATCH_FILE];
    });
});

app.listen(process.env.PORT, () => {
    console.log("Application is started on localhost:" + process.env.PORT);
});
