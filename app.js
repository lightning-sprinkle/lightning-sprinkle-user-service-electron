"use strict";

import { app, nativeImage, Tray, Menu, BrowserWindow } from "electron";

let top = {}; // prevent gc to keep windows

app.once("ready", ev => {
    top.win = new BrowserWindow({
        width: 800, height: 600, center: true, minimizable: false, show: false,
        webPreferences: {
            nodeIntegration: false,
            webSecurity: true,
            sandbox: true,
        },                                
    });
    top.win.loadURL("https://google.com/");
    top.win.on("close", ev => {
        //console.log(ev);
        ev.sender.hide();
        ev.preventDefault(); // prevent quit process
    });

    top.tray = new Tray("icon.png");
    const menu = Menu.buildFromTemplate([
        {label: "Actions", submenu: [
            {label: "Open Google", click: (item, window, event) => {
                //console.log(item, event);
                top.win.show();
            }},
        ]},
        {type: "separator"},
        {role: "quit"}, // "role": system prepared action menu
    ]);
    top.tray.setToolTip("hello electrol");
    top.tray.setContextMenu(menu);

    // Option: some animated web site to tray icon image
    // see: https://electron.atom.io/docs/tutorial/offscreen-rendering/
    top.icons = new BrowserWindow({
        show: false, webPreferences: {offscreen: true}});
    top.icons.loadURL("https://trends.google.com/trends/hottrends/visualize");
    top.icons.webContents.on("paint", (event, dirty, image) => {
        if (top.tray) top.tray.setImage(image.resize({width: 16, height: 16}));
    });
});
app.on("before-quit", ev => {
    top.win.removeAllListeners("close");
    top = null;
});
