const express = require("express");
const chokidar = require("chokidar");

const app = express();
app.use((req, res, next) => {
    const appCallback = require("/home/diman/PhpstormProjects/react/dist.server.js").default;
    appCallback(req, res, next);
});

const watcher = chokidar.watch('/home/diman/PhpstormProjects/react/dist.server.js');
watcher.on('ready', function () {
    watcher.on('all', function () {
        console.log('HOT RELOAD!');
        delete require.cache['/home/diman/PhpstormProjects/react/dist.server.js'];
    });
});

app.listen(7777, () => {
    console.log("Application is started on localhost:7777");
});
