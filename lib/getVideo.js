const fs = require('fs');

module.exports = () => {
  const videoJSONpath = './video.json';
  let Video = {};
  if (fs.existsSync(videoJSONpath)) {
    const rawdata = fs.readFileSync(videoJSONpath);
    Video = JSON.parse(rawdata);
  } 
  return Video;
};
