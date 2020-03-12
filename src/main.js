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
api.init()
app.once("ready", ev => {
  top.win = new BrowserWindow({
    width: 400,
    height: 400,
    center: true,
    minimizable: false,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      webSecurity: true,
      sandbox: true
    }
  });
  top.win.loadURL("http://localhost:28373/deposit");
  top.win.setMenu(null)
  top.win.on("close", ev => {
    ev.sender.hide();
    ev.preventDefault();
  });
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
      label: "Deposit",
      click: (item, window, event) => {
        top.win.show();
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
