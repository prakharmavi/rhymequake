/**
 * WEB222 – Assignment 04
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:       <Prakhar Dhanesh Mavi>
 *      Student ID: <152781225>
 *      Date:       <8 march 2024>
 */
// All of our data is available on the global `window` object.
// Create local variables to work with it in this file.
const { artists, songs } = window;

// For debugging, display all of our data in the console. You can remove this later.
console.log({ artists, songs }, "App Data");

// Event handler for when the page is loaded
window.onload = function () {
  // Create buttons for each artist
  const menu = document.getElementById("menu");
  artists.forEach((artist) => {
    const button = document.createElement("button");
    button.textContent = artist.name;
    button.addEventListener("click", function () {
      showSongs(artist.artistId);
    });
    menu.appendChild(button);
  });

  // Show songs for the default artist (first artist)
  showSongs(artists[0].artistId);
};

// Function to show songs for a specific artist
// Function to show songs for a specific artist
function showSongs(artistId) {
  const selectedArtistHeader = document.getElementById("selected-artist");
  const songsContainer = document.getElementById("songs");
  const selectedArtist = artists.find((artist) => artist.artistId === artistId);

  // Update selected artist header and links
  selectedArtistHeader.textContent = selectedArtist.name;
  const artistLinks = selectedArtist.urls.map(
    (link) => `<a href="${link.url}" target="_blank">${link.name}</a>`
  );
  selectedArtistHeader.innerHTML += ` (${artistLinks.join(", ")})`;

  // Clear current songs from the container
  songsContainer.innerHTML = "";

  // Filter songs for the selected artist
  const filteredSongs = songs.filter((song) => song.artistId === artistId && !song.explicit);

  // Add filtered songs to the container
  filteredSongs.forEach((song) => {
    const card = createSongCard(song);
    songsContainer.appendChild(card);
  });
}
function createSongCard(song) {
  const card = document.createElement("a");
  card.href = song.url;
  card.classList.add("card");

  const songImg = document.createElement("img");
  songImg.src = song.imageUrl;
  songImg.classList.add("card-image");
  card.appendChild(songImg);

  const songTitle = document.createElement("h5");
  songTitle.textContent = song.title;
  songTitle.classList.add("card-title");
  card.appendChild(songTitle);

  const songYear = document.createElement("time");
  songYear.textContent = song.year;
  songYear.classList.add("card-time");
  card.appendChild(songYear);

  const songDuration = document.createElement("span");
  songDuration.textContent = formatDuration(song.duration);
  songDuration.classList.add("card-duration");
  card.appendChild(songDuration);

  return card;
}

// Function to format duration from seconds to mm:ss
function formatDuration(durationInSeconds) {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = durationInSeconds % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
