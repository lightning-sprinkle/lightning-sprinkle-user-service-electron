"use strict";

const { app, Tray, Menu, BrowserWindow } = require("electron");
const api = require("./routes");
const lndChildProcess = require("./lnd-child-process");


const Logger = {
  info: msg => {
    console.log(msg);
  },
  error: msg => {
    console.error(msg);
  },
};

lndChildProcess.startLndProcess("/home/daan/.config/lightning-app/lnd", Logger)

let top = {};

app.once("ready", ev => {
  api.init();
  top.tray = new Tray("icon.png");
  const menu = Menu.buildFromTemplate([{ role: "quit" }]);
  top.tray.setToolTip("hello electrol");
  top.tray.setContextMenu(menu);
});
app.on("before-quit", ev => {
  top.win.removeAllListeners("close");
  top = null;
});
