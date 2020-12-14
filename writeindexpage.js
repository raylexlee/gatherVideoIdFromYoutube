const fs = require('fs');
const Playlist = require('./lib/getVideo.js')();
const playlistIds = Object.keys(Playlist);
const Category = {
  "song": "Single Song",
  "album": "Album",
  "game": "Gaming Tutorial",
  "code": "Coding Tutorial",
  "radio": "Radio Drama",
  "drama": "Video Drama",
  "book": "Audio-book"
};
const now = require('./lib/gethknowtime.js')();
const optPlaylist = id => {
  const fullTitle = `${Playlist[id].title}(${Playlist[id].videoCount})`;
  return `<li><a href="javascript:outputHTML('${id}')">${fullTitle}</a></li>`;
};
const optCategory = categoryId => `<a href="#">${Category[categoryId]}</a>`;

const navList = Object.keys(Category).map(catId => ` <li>
            ${optCategory(catId)}
            <ul class="nav-dropdown">
            ${(catId === 'song') ? '<li><a href="javascript:playSongsRandom()">20 Random Songs</a></li>' : ''}
            ${playlistIds.filter(vId => Playlist[vId].category === catId).map(pId => optPlaylist(pId)).join('\n')}
            </ul>
          </li>`).join('\n');
const indexpage = navlist => `<!doctype html>
<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <title>明之選</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <meta name="apple-mobile-web-app-title" content="明之選">
  <link rel="apple-touch-icon" sizes="152x152" href="apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
  <link rel="manifest" href="site.webmanifest">
  <link rel="mask-icon" href="safari-pinned-tab.svg" color="#5bbad5">
  <meta name="msapplication-TileColor" content="#da532c">
  <meta name="theme-color" content="#ffffff">

  <!-- Custom styles for this template -->
  <link rel='stylesheet' id='carousel' href='carousel.css' type='text/css' media='all'>
  <link rel='stylesheet' id='nav-css' href='navbar/nav.css' type='text/css' media='all'>
</head>

<body>
  <section class="navigation">
    <div class="nav-container">
      <div class="brand">
        <img src="radio.png" width="auto" height="70" />
        <div class="subtitle">明之選<br />手機優化版</div>
      </div>
      <nav>
        <div class="nav-mobile">
          <a class="active" id="nav-toggle" href="#!"><span></span></a>
        </div>
        <ul class="nav-list" id="navList">
           ${navlist}
        </ul>
      </nav>
    </div>
  </section>
  <section>
     <div class="videoWrapper" id="ytVideo"></div> 
  </section>
<section>
  <p>${now}</p>
</section>

</body>
  <script src="raylex_index.js"></script>
  <script type='text/javascript' src='navbar/raylex_nav.js'></script>
</html>`;
fs.writeFileSync('./menu/index.html', indexpage(navList));
