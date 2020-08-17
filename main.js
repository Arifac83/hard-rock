// get id 
const lyricSearch = document.getElementById('lyricSearch');
const searchBtn = document.getElementById('searchBtn');

//Event handler in search-button
searchBtn.addEventListener('click', function () {

    let totalResult = document.getElementById('totalResult');
    totalResult.innerHTML = '';
    const searchSong = lyricSearch.value;

    if (searchSong == "") {
        alert('The search value is empty!');
    }
    else {
        fetch(`https://api.lyrics.ovh/suggest/${searchSong}`)
        .then(res => res.json())
        .then(data => {
            for (let i = 0; i < 10; i++) {
                const element = data.data[i];
                const title = element.album.title;
                const artist = element.artist.name;
                const imageData = element.album.cover_small;
        
                totalResult.innerHTML += `<div class="single-result row align-items-center my-5 p-3">
                                                <div class="col-md-3">
                                                    <img src="${imageData}" alt="">
                                                </div>
                                                <div class="col-md-6 text-center">
                                                    <h3 class="lyrics-name">${title}</h3>
                                                    <p class="author lead">Album by <span>${artist}</span></p>
                                                </div>
                                                <div class="col-md-3 text-md-right text-center">
                                                    <a href="#" onclick="getLyrics('${artist}', '${title}')" class="btn btn-success">Get Lyrics</a>
                                                </div>
                                            </div>
                                    `;
            }
        })
    }
})
//Event handler in getLyrics-button
const getLyrics = (artist, title) => {
    console.log(artist, title);

    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
        .then(res => res.json())
        .then(data => { displayLyrics(data, artist, title) })
}
//display lyrics
function displayLyrics(data, artist, title) {
    document.getElementById("title").innerHTML = `${title}`;
    document.getElementById("artist").innerHTML = `- ${artist}`;

    if (data.lyrics) {
        document.getElementById("getLyrics").innerHTML = `${data.lyrics}`;
    }
    else if (data.lyrics == undefined) {
        document.getElementById("getLyrics").innerHTML = "Lyrics is not found !";
    }
}