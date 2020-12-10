const { ipcMain } = require('electron');
const fs = require('fs');

const ipcRenderer = require('electron').ipcRenderer;
const VideoRepresentation = arg => `Video["${arg.link}"] = {
    "linktitle": "${arg.videoObj.linktitle}",
    "title": "${arg.videoObj.title}",
    "videoCount": "${arg.videoObj.videoCount}",
    "category": "${arg.videoObj.category}"
}`;
const videoLink = id => id.startsWith("PL")
    ? `https://www.youtube.com/playlist?list=${id}`
    : `https://www.youtube.com/watch?v=${id}`;

ipcRenderer.on('video-sent', function(event, arg) {
    const link = arg.link;
    const video = arg.videoObj;
    document.getElementById("link").value = videoLink(link);
    document.getElementById("linktitle").value = video.linktitle;
    document.getElementById("title").value = video.title;
    document.getElementById("videoCount").value = video.videoCount;
    document.getElementById(video.category).checked = true;
    document.getElementById("link_videoObj").value = VideoRepresentation(arg);
});

ipcRenderer.on('video-deleted', function(event, arg) {
    const link = arg.link;
    const video = arg.videoObj;
    document.getElementById("link").value = videoLink(link);
    document.getElementById("linktitle").value = video.linktitle;
    document.getElementById("title").value = video.title;
    document.getElementById("videoCount").value = video.videoCount;
    document.getElementById(video.category).checked = true;
    document.getElementById("link_videoObj").value = `DELETED ==>\n${VideoRepresentation(arg)}`;
});

ipcRenderer.on('link-title-sent', function(event, arg) {
    const link = arg.link;
    if (link) {
      document.getElementById("link").value = videoLink(link);
      document.getElementById("linktitle").value = arg.linktitle;
    }
});


function requestVideo() {
    const link = document.getElementById("link").value;
    // const r = link.match(/\?v=(.*)$/);
    const r = link.match(/=([^=]+)$/);
    ipcRenderer.send('request-video', r ? r[1] : '')
}

function requestLinkTitle() {
    ipcRenderer.send('request-link-title', 'request link title')
}

function deleteVideo() {
    const link = document.getElementById("link").value;
    const r = link.match(/=([^=]+)$/);
    ipcRenderer.send('delete-video', r ? r[1] : '')
}

function sendForm(event) {
    event.preventDefault() // stop the form from submitting
    const url = document.getElementById("link").value;
    // const r = url.match(/v=(.*)$/);
    const r = url.match(/=([^=]+)$/);
    if (!r) return;
    const link = r[1];
    const linktitle = document.getElementById("linktitle").value;
    const videoCount = document.getElementById("videoCount").value;
    const title = document.getElementById("title").value;
    let categoryValue = "song";
    const category = document.getElementsByName("category");
    for (let x=0; x < category.length; x++)
        if (category[x].checked) {
            categoryValue = category[x].defaultValue;
        }
    const videoObj = {
        linktitle: linktitle,
        title: title,
        videoCount: videoCount,
        category: categoryValue
    };
    const arg = {link: link, videoObj: videoObj};
    ipcRenderer.send('form-submission', arg)
}

function commandlineDownload() {
    const url = document.getElementById("link").value;
    // const r = url.match(/v=(.*)$/);
    const r = url.match(/=([^=]+)$/);
    if (!r) return;
    const ytId = r[1];
    const outputFilename = ytId.startsWith("PL")
      ? "'%(playlist_index)s-%(title)s.%(ext)s'"
      : "'%(title)s.%(ext)s'";
    let formatValue = "-f mp4";
    const format = document.getElementsByName("format");
    for (let x=0; x < format.length; x++)
        if (format[x].checked) {
            formatValue = format[x].defaultValue;
        }
    let qualityValue = "5";
    const quality = document.getElementsByName("quality");
    for (let x=0; x < quality.length; x++)
        if (quality[x].checked) {
            qualityValue = quality[x].defaultValue;
        }
    document.getElementById("link_videoObj").value 
      = `youtube-dl ${formatValue} --audio-quality ${qualityValue} -o ${outputFilename} ${url}`;    
}