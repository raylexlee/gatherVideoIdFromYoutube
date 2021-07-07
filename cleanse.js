/* Modified getlast_chapter.js by Raylex Lee on 7 Frebuary 2021
   Purpose : cleanse those unavailable youtube videoid or playlistid entries in video.json
   Usage : node cleanse.js
   
*/
const fs = require('fs');
const ErrorIds = fs.readFileSync('./errorid.txt', {encoding:'utf8', flag:'r'}).replace(/\n+$/, "").split('\n');
const Video = require('./lib/getVideo.js')();
const videoJSONpath = './video.json';
ErrorIds.forEach(id => { delete Video[id]; }); 
fs.writeFileSync(videoJSONpath, JSON.stringify(Video));
