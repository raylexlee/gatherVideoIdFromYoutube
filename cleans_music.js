/* Modified cleanse.js by Raylex Lee on 7 Frebuary 2021
   Purpose : cleanse those unavailable youtube videoid or p entries in album.json
   Usage : node cleanse.js
   
*/
const fs = require('fs');
const videoJSONpath = './album.json';
const ErrorIds = fs.readFileSync('./errorid.txt', {encoding:'utf8', flag:'r'}).replace(/\n+$/, "").split('\n');
const rawdata = fs.readFileSync(videoJSONpath);
const Video = JSON.parse(rawdata);
ErrorIds.forEach(id => { delete Video[id]; }); 
fs.writeFileSync(videoJSONpath, JSON.stringify(Video));
