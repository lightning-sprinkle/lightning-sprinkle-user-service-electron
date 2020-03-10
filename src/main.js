"use strict";

const { app, Tray, Menu, BrowserWindow } = require("electron");

let top = {}; // prevent gc to keep windows

app.once("ready", ev => {
  top.win = new BrowserWindow({
    width: 800,
    height: 600,
    center: true,
    minimizable: false,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      webSecurity: true,
      sandbox: true
    }
  });
  top.win.loadURL("https://google.com/");
  top.win.on("close", ev => {
    //console.log(ev);
    ev.sender.hide();
    ev.preventDefault(); // prevent quit process
  });

  top.tray = new Tray("icon.png");
  const menu = Menu.buildFromTemplate([
    { role: "quit" } // "role": system prepared action menu
  ]);
  top.tray.setToolTip("hello electrol");
  top.tray.setContextMenu(menu);
});
app.on("before-quit", ev => {
  top.win.removeAllListeners("close");
  top = null;
});
