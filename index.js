#!/usr/bin/env node
const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron');
const fs = require('fs');
const Video = require('./lib/getVideo.js')();
const videoJSONpath = './video.json';
let window, wintube  

function createWindow(){
    window = new BrowserWindow({
        show: false,
        width: 705,
        height: 790,
        webPreferences: {
          nodeIntegration: true
          }

    });

    window.loadURL(`file://${__dirname}/index.html`);
    window.once('ready-to-show', function (){
        window.show();
    });

//    window.webContents.openDevTools();

    let contents = window.webContents;

    window.on('closed', function() {
        window = null;
    });
}

function createWintube() { 
  const url =  `https://www.youtube.com`
  wintube = new BrowserWindow({width: 1280, height: 700, title: url}) 
  wintube.loadURL(url) 
//  wintube.webContents.openDevTools()
}  

ipcMain.on('form-submission', function (event, arg) {
    Video[arg.link] = arg.videoObj;
    fs.writeFileSync(videoJSONpath, JSON.stringify(Video));
//    console.log("Video Object", Video)
});

ipcMain.on('request-video', (event, link) => {
  const arg = ( link && (link in Video) ) 
      ? {link: link, videoObj: Video[link]} 
      : {link: link, videoObj: {}};
  event.reply('video-sent', arg)
});

ipcMain.on('request-link-title', (event, req) => {
   const url = wintube.getURL();
   // const r = url.match(/v=(.*)$/);
   const r = url.match(/=([^=]+)$/);
   const link = r ? r[1] : '';
   const linktitle = r ? wintube.getTitle().replace(/\s-\sYouTube$/,'') : '';
   event.reply('link-title-sent', {link: link, linktitle: linktitle});
});

app.on('ready', function(){
    createWindow();
    createWintube();
});
