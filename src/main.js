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
  }
};

// lndChildProcess.startLndProcess("/home/daan/lndsettings", Logger)

let top = {};

app.once("ready", ev => {
  top.tray = new Tray("icon.png");
  const menu = Menu.buildFromTemplate([
    {
      label: "Lightning Sprinkle 0.1",
      enabled: false
    },
    {
      label: "Running",
      enabled: false
    },
    { type: "separator" },
    {
      label: "Manage",
      click: function() {
        console.log("Clicked on settings");
      }
    },
    {
      role: "quit"
    }
  ]);
  top.tray.setContextMenu(menu);
});
app.on("before-quit", ev => {
  top.win.removeAllListeners("close");
  top = null;
});
