const fs = require('fs');
const videoJSONpath = '/home/raylex/gatherVideoIdFromYoutube/video.json';
const Video = JSON.parse(fs.readFileSync(videoJSONpath));
const albumJSONpath = '/home/raylex/splitMP3FromYoutube/album.json';
const Album = JSON.parse(fs.readFileSync(albumJSONpath));
Object.keys(Album).forEach(id => { Video[id] = {
    linktitle: Album[id].linktitle,
    title: `${Album[id].singer} - ${Album[id].album}`,
    videoCount: "1",
    category: "album"
}; });
// console.log(JSON.stringify(Video));
fs.writeFileSync(videoJSONpath, JSON.stringify(Video));