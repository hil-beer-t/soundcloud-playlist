var SoundCloudAPI = {};

SoundCloudAPI.init = function () {
  SC.initialize({
    client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
  });
}
SoundCloudAPI.init();


SoundCloudAPI.getTrack = function (inputValue) {
  if (inputValue == "" || inputValue == undefined)
    return;
  // find all sounds of buskers licensed under 'creative commons share alike'
  SC.get('/tracks', {
    q: inputValue
  }).then(function (tracks) {
    SoundCloudAPI.renderTracks(tracks);
  });
}

let UI = {};
UI.search = function () {
  var inputBar = document.querySelector('.input').addEventListener('keyup', (e) => {
    if (e.which === 13) {
      inputValue = document.querySelector('input').value;
      clear = document.querySelector('.search-results');
      clear.innerHTML = " ";
      console.log(inputValue)
      SoundCloudAPI.getTrack(inputValue);
    }
  });
}

UI.search();


SoundCloudAPI.renderTracks = function (tracks) {
  tracks.forEach((track) => {
    //<div class="card">
    const card = document.createElement('div');
    let searchResults = document.querySelector(".js-search-results");
    searchResults.appendChild(card);
    card.classList.add('card');
    //-----------------------------

    //<div class="image">
    const image = document.createElement('div');
    let insideCard = document.querySelectorAll('.card');
    insideCard[insideCard.length - 1].appendChild(image);
    image.classList.add('image');
    //<img class="image_img" src="http://www.placekitten.com/290/290"> inside image
    const image_img = document.createElement('img');
    let insideImage = document.querySelectorAll('.image');
    insideImage[insideImage.length - 1].appendChild(image_img);
    image_img.classList.add('image_img');
    image_img.setAttribute('src', track.artwork_url || "http://www.placekitten.com/290/290");
    //------------------------------

    //<div class="content"> inside card
    const content = document.createElement('div');
    insideCard[insideCard.length - 1].appendChild(content);
    content.classList.add('content');
    //<div class="header"> inside content
    const header = document.createElement('div');
    let insideContent = document.querySelectorAll('.content');
    insideContent[insideContent.length - 1].appendChild(header);
    header.classList.add('header');
    //<a href="https://soundcloud.com/barsuk-records/rilo-kiley-science-vs-romance"
    //target="_blank">"Science Vs. Romance"</a> inside header
    const anchor = document.createElement('a');
    let insideHeader = document.querySelectorAll('.header');
    insideHeader[insideHeader.length - 1].appendChild(anchor);
    anchor.setAttribute('href', track.permalink_url);
    anchor.setAttribute('target', '_blank');
    anchor.innerHTML = track.title;
    //-----------------------------

    //<div class="ui bottom attached button js-button"> inside card
    const js_button = document.createElement('div');
    insideCard[insideCard.length - 1].appendChild(js_button);
    js_button.classList.add('ui', 'bottom', 'attached', 'button', 'js-button');
    js_button.addEventListener('click', function () {
      SoundCloudAPI.getEmbbed(track.permalink_url);
    });
    //<i class="add icon"></i> inside js_button
    const icon = document.createElement('i');
    const insideJs_button = document.querySelectorAll('.js-button');
    insideJs_button[insideJs_button.length - 1].appendChild(icon);
    icon.classList.add('add', 'icon');
    //<span>Add to playlist</span>
    const span = document.createElement('span');
    insideJs_button[insideJs_button.length - 1].appendChild(span);
    span.innerHTML = "Add to playlist";

  });
}

SoundCloudAPI.getEmbbed = function (link) {
  SC.oEmbed(link, {
    auto_play: true
  }).then(function (embed) {
    console.log('Click embedded');
    var sideBar = document.querySelector('.js-playlist');

    var box = document.createElement('div');
    box.innerHTML = embed.html;

    sideBar.insertBefore(box, sideBar.firstChild);
    localStorage.setItem("key", sideBar.innerHTML);
  });
}

Storage.clear();

var sideBar = document.querySelector('.js-playlist');
sideBar.innerHTML = localStorage.getItem("key");
